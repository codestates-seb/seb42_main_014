package com.main.volunteer.domain.volunteer.service;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.domain.tag.service.TagService;
import com.main.volunteer.domain.volunteer.entity.Condition;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.entity.VolunteerStatus;
import com.main.volunteer.domain.volunteer.repository.VolunteerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private final TagService tagService;

    public VolunteerService(VolunteerRepository volunteerRepository, MemberService memberService, TagService tagService) {
        this.volunteerRepository = volunteerRepository;
        this.memberService = memberService;
        this.tagService = tagService;
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
            throw new RuntimeException("봉사 날짜 이후에는 삭제할 수 없습니다.");
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
     봉사 목록 조회 - ALL
     */
    public List<Volunteer> getVolunteerList() {

        List<Volunteer> volunteerList =  volunteerRepository.findAll();
        setVolunteerStatusForList(volunteerList);

        return volunteerList;
    }

    /**
     * 봉사 목록 조회 - 필터링 / 검색 구현
     */
    public Page<Volunteer> getVolunteerListBySearching(Condition condition) {

        Optional<Page<Volunteer>> optional = Optional.ofNullable(volunteerRepository.findBySearchOption(condition));

        return optional.orElseThrow(() -> new RuntimeException("해당하는 봉사 활동이 없습니다."));
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
        Volunteer volunteer = optional.orElseThrow(() -> new RuntimeException("존재하는 봉사활동이 없습니다."));

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
            throw new RuntimeException("등록한 봉사 활동의 기관이 아닙니다.");
        }

        return volunteer;
    }


    /**
     봉사 등록 가능 날짜 확인 로직
     */
    private void verifyDate(LocalDateTime applyDate, LocalDateTime volunteerDate) {
        LocalDateTime now = LocalDateTime.now();
        if(volunteerDate.isBefore(now)){
            throw new RuntimeException("봉사 날짜가 현재 날짜보다 이전입니다.");
        }
        if(volunteerDate.isBefore(applyDate)){
            throw new RuntimeException("봉사 날짜가 신청 시작 날짜보다 이전입니다.");
        }

        if(applyDate.isAfter(volunteerDate.minusHours(48))){
            throw new RuntimeException("봉사 날짜 48시간 전까지 봉사 등록이 가능합니다.");
        }

        if(LocalDateTime.now().isAfter(volunteerDate.minusHours(48))){
            throw new RuntimeException("봉사 날짜 48시간 전까지 봉사 등록이 가능합니다.");
        }
    }

    private List<Volunteer> getOptionalList(Optional<List<Volunteer>> optional){
        List<Volunteer> volunteerList =  optional.orElseThrow(() -> new RuntimeException("등록한 봉사 활동이 없습니다."));
        setVolunteerStatusForList(volunteerList);

        return volunteerList;
    }

}
