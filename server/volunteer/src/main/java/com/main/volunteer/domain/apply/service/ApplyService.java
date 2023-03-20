package com.main.volunteer.domain.apply.service;

import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.apply.entity.ApplyStatus;
import com.main.volunteer.domain.apply.repository.ApplyRepository;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.point.service.PointService;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.entity.VolunteerStatus;
import com.main.volunteer.domain.volunteer.service.VolunteerService;
import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ApplyService {

    private static final Integer ONE_DAYS_OF_HOURS = 24;

    private final VolunteerService volunteerService;
    private final PointService pointService;
    private final ApplyRepository applyRepository;

    public ApplyService(VolunteerService volunteerService, PointService pointService, ApplyRepository applyRepository) {
        this.volunteerService = volunteerService;
        this.pointService = pointService;
        this.applyRepository = applyRepository;
    }

    /**
    봉사 신청 로직
     */
    public Apply createApply(Apply apply, Long volunteerId) {

        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);
        apply.setVolunteer(volunteer);

        verifyVolunteerStatus(volunteer);

        return verifyApplyStatus(apply);
    }

    /**
    봉사 신청 취소 로직
     */
    public Apply cancelApply(Long volunteerId, Member member) {

        Apply verifiedApply = verifyCancelableApply(volunteerId, member);

        verifiedApply.setApplyStatus(ApplyStatus.APPLY_CANCEL);
        volunteerService.minusApplyCount(verifiedApply.getVolunteer());
        pointService.minusPointCount(member);

        return applyRepository.save(verifiedApply);
    }



    /**
    특정 사용자 봉사 신청 내역
     */
    public List<Apply> getMyPlanList(Member member) {

        Optional<List<Apply>> optional = applyRepository.findByMemberAndVolunteer_VolunteerStatusNot(member, VolunteerStatus.VOLUNTEER_AFTER);

        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.APPLY_NOT_EXIST));
    }

    /**
    특정 사용자 봉사 활동 내역
     */
    public List<Apply> getMyHistoryList(Member member) {

        Optional<List<Apply>> optional = applyRepository.findByMemberAndVolunteer_VolunteerStatus(member, VolunteerStatus.VOLUNTEER_AFTER);

        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.APPLY_NOT_EXIST));
    }

    /**
    특정 기관이 등록한 봉사활동에 신청한 내역
     */
    public List<Apply> getApplyListByOrganization(Long volunteerId,Member member) {
        Volunteer volunteer = volunteerService.verifyOwnership(volunteerId,member);
        Optional<List<Apply>> optional = applyRepository.findAllByVolunteer(volunteer);
        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.APPLY_NOT_EXIST));
    }

    /**
     신청 가능 여부 확인 로직
     */
    private void verifyVolunteerStatus(Volunteer volunteer) {

        if(volunteer.getVolunteerStatus() == VolunteerStatus.VOLUNTEER_AFTER){
            throw new BusinessException(ExceptionCode.VOLUNTEER_STATUS_AFTER);
        }else if(volunteer.getVolunteerStatus() == VolunteerStatus.VOLUNTEER_APPLY_AFTER){
            throw new BusinessException(ExceptionCode.VOLUNTEER_STATUS_APPLY_AFTER);
        }else if(volunteer.getVolunteerStatus() == VolunteerStatus.VOLUNTEER_APPLY_BEFORE){
            throw new BusinessException(ExceptionCode.VOLUNTEER_STATUS_APPLY_BEFORE);
        }else if(volunteer.getVolunteerStatus() == VolunteerStatus.VOLUNTEER_APPLY_LIMIT_OVER){
            throw new BusinessException(ExceptionCode.VOLUNTEER_DATE_BEFORE_APPLY_DATE);
        }

    }

    /**
     신청한 이력 확인 로직
     */
    private Apply verifyApplyStatus(Apply apply) {
        Optional<Apply> optional = applyRepository.findByVolunteerAndMember(apply.getVolunteer(), apply.getMember());
        if(optional.isPresent()){
            Apply existedApply = optional.get();
            if(existedApply.getApplyStatus() == ApplyStatus.APPLY_COMPLETE) {
                throw new BusinessException(ExceptionCode.APPLY_ALREADY_COMPLETED);
            }
            if(existedApply.getApplyStatus() == ApplyStatus.APPLY_CANCEL){
                return saveApply(existedApply);
            }
        }else{
            return saveApply(apply);
        }
        return apply;
    }

    private Apply saveApply(Apply apply) {
        apply.setApplyStatus(ApplyStatus.APPLY_COMPLETE);
        applyRepository.save(apply);
        volunteerService.plusApplyCount(apply.getVolunteer());
        pointService.plusPointCount(apply.getMember());
        return apply;
    }

    /**
     신청 취소 가능 여부 확인 로직
     */
    private Apply verifyCancelableApply(Long volunteerId, Member member) {
        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);

        Optional<Apply> optional = applyRepository.findByVolunteerAndMember(volunteer, member);
        Apply apply = optional.orElseThrow(() -> new BusinessException(ExceptionCode.APPLY_NOT_EXIST));

        if(apply.getApplyStatus() == ApplyStatus.APPLY_CANCEL){
            throw new BusinessException(ExceptionCode.APPLY_ALREADY_CANCELED);
        }

        if(LocalDateTime.now().isAfter(volunteer.getVolunteerDate().minusHours(ONE_DAYS_OF_HOURS))){
            throw new BusinessException(ExceptionCode.NOW_AFTER_VOLUNTEER_DATE_1_DAYS_BEFORE);
        }

        return apply;

    }

    /**
    특정 사용자 특정 봉사 활동 내역 존재 여부 검증 로직
     */
    public void verifyMemberVolunteer(Volunteer volunteer, Member member) {
        Optional<Apply> optional = applyRepository.findByVolunteerAndMember(volunteer, member);
        optional.orElseThrow(() -> new BusinessException(ExceptionCode.APPLY_NOT_EXIST));
    }

}
