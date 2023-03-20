package com.main.volunteer.domain.volunteer.service;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.domain.volunteer.entity.Condition;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.entity.VolunteerStatus;
import com.main.volunteer.domain.volunteer.repository.VolunteerRepository;
import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
public class VolunteerService {

    private final VolunteerRepository volunteerRepository;
    private final MemberService memberService;

    private static final Integer TWO_DAYS_OF_HOURS = 48;

    public VolunteerService(VolunteerRepository volunteerRepository, MemberService memberService) {
        this.volunteerRepository = volunteerRepository;
        this.memberService = memberService;
    }

    /*
    봉사 등록 로직
     */
    public Volunteer createVolunteer(Volunteer volunteer) {

        verifyDate(volunteer.getApplyDate(), volunteer.getVolunteerDate());

        if(volunteer.getApplyDate().isBefore(LocalDateTime.now())){
            volunteer.setVolunteerStatus(VolunteerStatus.VOLUNTEER_APPLYING);
        }else{
            volunteer.setVolunteerStatus(VolunteerStatus.VOLUNTEER_APPLY_BEFORE);
        }

        volunteerRepository.save(volunteer);

        return volunteer;
    }

    /**
    봉사 삭제 로직
     */
    public void deleteVolunteer(Long volunteerId, Member member) {

        Volunteer volunteer = verifyExistVolunteer(volunteerId);

        verifyOwnership(volunteerId, member);

        if(volunteer.getVolunteerDate().isBefore(LocalDateTime.now())){
            throw new BusinessException(ExceptionCode.NOW_AFTER_VOLUNTEER_DATE);
        }else{
            /*
            추후 개발
            해당 봉사를 신청한 사람들에게 이메일 전송
             */
            volunteerRepository.delete(volunteer);
        }
    }

    /**
    봉사 기관이 등록한 봉사 활동 목록 조회
     */
    public List<Volunteer> getVolunteerListByOrg(CustomUserDetails userDetails) {
        return getOptionalList(volunteerRepository.findAllByMember(memberService.findMember(userDetails.getMemberId())));
    }

    /**
     특정 봉사 활동 조회
     */
    public Volunteer getVolunteer(Long volunteerId) {

        return verifyExistVolunteer(volunteerId);
    }

    /**
     * 봉사 목록 조회 - 필터링 / 검색 구현
     */
    public Page<Volunteer> getVolunteerListBySearching(Condition condition) {

        Optional<Page<Volunteer>> optional = Optional.ofNullable(volunteerRepository.findBySearchOption(condition));

        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.VOLUNTEER_NOT_EXIST));
    }



    /**
     * VolunteerList volunteerStatus update
     */
    public void setVolunteerStatusForList(List<Volunteer> volunteerList){

        volunteerList.forEach(this::setVolunteerStatus);
    }

    /**
     * Volunteer volunteerStatus update
     */
    public void setVolunteerStatus(Volunteer volunteer){
        if(LocalDateTime.now().isBefore(volunteer.getApplyDate())){
            volunteer.setVolunteerStatus(VolunteerStatus.VOLUNTEER_APPLY_BEFORE);
        }

        if(LocalDateTime.now().isAfter(volunteer.getApplyDate()) && LocalDateTime.now().isBefore(volunteer.getVolunteerDate().minusHours(24))){
            if(volunteer.getApplyCount() >= volunteer.getApplyLimit()){
                volunteer.setVolunteerStatus(VolunteerStatus.VOLUNTEER_APPLY_LIMIT_OVER);
            }else {
                volunteer.setVolunteerStatus(VolunteerStatus.VOLUNTEER_APPLYING);
            }
        }

        if(LocalDateTime.now().isAfter(volunteer.getVolunteerDate().minusHours(24)) && LocalDateTime.now().isBefore(volunteer.getVolunteerDate())){
            volunteer.setVolunteerStatus(VolunteerStatus.VOLUNTEER_APPLY_AFTER);
        }

        if(LocalDateTime.now().isAfter(volunteer.getVolunteerDate())){
            volunteer.setVolunteerStatus(VolunteerStatus.VOLUNTEER_AFTER);
        }
        volunteerRepository.save(volunteer);
    }

    /**
    봉사 활동 신청 시 신청 인원 변경 로직
     */
    public void plusApplyCount(Volunteer volunteer) {
        volunteer.setApplyCount(volunteer.getApplyCount()+1);
        setVolunteerStatus(volunteer);
        volunteerRepository.save(volunteer);
    }

    public void minusApplyCount(Volunteer volunteer) {
        volunteer.setApplyCount(volunteer.getApplyCount()-1);
        setVolunteerStatus(volunteer);
        volunteerRepository.save(volunteer);
    }

    /**
    찜하기 likeCount 변경 로직
     */
    public void plusLikeCount(Volunteer volunteer) {
        volunteer.setLikeCount(volunteer.getLikeCount() +1);
        setVolunteerStatus(volunteer);
        volunteerRepository.save(volunteer);
    }

    public void minusLikeCount(Volunteer volunteer) {
        volunteer.setLikeCount(volunteer.getLikeCount() -1);
        setVolunteerStatus(volunteer);
        volunteerRepository.save(volunteer);
    }

    /**
    봉사 활동 존재 여부 검증 로직
     */
    public Volunteer verifyExistVolunteer(Long volunteerId) {
        Optional<Volunteer> optional = volunteerRepository.findById(volunteerId);
        Volunteer volunteer = optional.orElseThrow(() -> new BusinessException(ExceptionCode.VOLUNTEER_NOT_EXIST));

        setVolunteerStatus(volunteer);
        return volunteer;
    }


    /**
    특정 봉사를 등록한 기관인지 확인
     */
    public Volunteer verifyOwnership(Long volunteerId, Member member) {
        Volunteer volunteer = verifyExistVolunteer(volunteerId);
        Member organization = volunteer.getMember();
        if(!Objects.equals(organization.getMemberId(), member.getMemberId())){
            throw new BusinessException(ExceptionCode.ORGANIZATION_HAVE_NO_OWNERSHIP);
        }

        return volunteer;
    }


    /**
     봉사 등록 가능 날짜 확인 로직
     */
    private void verifyDate(LocalDateTime applyDate, LocalDateTime volunteerDate) {
        LocalDateTime now = LocalDateTime.now();
        if(volunteerDate.isBefore(now)){
            throw new BusinessException(ExceptionCode.VOLUNTEER_DATE_BEFORE_NOW);
        }
        if(volunteerDate.isBefore(applyDate)){
            throw new BusinessException(ExceptionCode.VOLUNTEER_DATE_BEFORE_APPLY_DATE);
        }

        if(applyDate.isAfter(volunteerDate.minusHours(TWO_DAYS_OF_HOURS))){
            throw new BusinessException(ExceptionCode.APPLY_DATE_AFTER_VOLUNTEER_DATE_2_DAYS_BEFORE);
        }

        if(LocalDateTime.now().isAfter(volunteerDate.minusHours(TWO_DAYS_OF_HOURS))){
            throw new BusinessException(ExceptionCode.APPLY_DATE_AFTER_VOLUNTEER_DATE_2_DAYS_BEFORE);
        }
    }

    private List<Volunteer> getOptionalList(Optional<List<Volunteer>> optional){
        List<Volunteer> volunteerList =  optional.orElseThrow(() -> new BusinessException(ExceptionCode.VOLUNTEER_NOT_EXIST));
        setVolunteerStatusForList(volunteerList);

        return volunteerList;
    }

}
