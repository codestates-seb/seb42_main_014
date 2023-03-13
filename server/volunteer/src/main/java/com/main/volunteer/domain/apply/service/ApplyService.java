package com.main.volunteer.domain.apply.service;

import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.apply.entity.ApplyStatus;
import com.main.volunteer.domain.apply.repository.ApplyRepository;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.entity.VolunteerStatus;
import com.main.volunteer.domain.volunteer.service.VolunteerService;
import com.main.volunteer.member.entity.Member;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ApplyService {

    private final VolunteerService volunteerService;
    private final ApplyRepository applyRepository;

    public ApplyService(VolunteerService volunteerService, ApplyRepository applyRepository) {
        this.volunteerService = volunteerService;
        this.applyRepository = applyRepository;
    }

    /*
    봉사 신청 로직
     */
    public Apply createApply(Apply apply, Long volunteerId) {

        verifyCreatableApply(apply, volunteerId);

        return verifyApplyStatus(apply);
    }

    /*
    신청한 이력 확인 로직
     */
    private Apply verifyApplyStatus(Apply apply) {
        Optional<Apply> optional = applyRepository.findByVolunteerAndMember(apply.getVolunteer(), apply.getMember());
        if(optional.isPresent()){
            Apply existedApply = optional.get();
            if(existedApply.getApplyStatus() == ApplyStatus.APPLY_COMPLETE) {
                throw new RuntimeException("이미 신청이 완료된 봉사활동입니다.");
            }
            if(existedApply.getApplyStatus() == ApplyStatus.APPLY_CANCEL){
                existedApply.setApplyStatus(ApplyStatus.APPLY_COMPLETE);
                applyRepository.save(existedApply);
                volunteerService.plusApplyCount(existedApply.getVolunteer());
                return existedApply;
            }
        }else{
            apply.setApplyStatus(ApplyStatus.APPLY_COMPLETE);
            applyRepository.save(apply);
            volunteerService.plusApplyCount(apply.getVolunteer());
            return apply;
        }

        return apply;
    }


    /*
    신청 가능 여부 확인 로직
     */
    private void verifyCreatableApply(Apply apply, Long volunteerId) {
        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);
        apply.setVolunteer(volunteer);

        if(volunteer.getVolunteerStatus() == VolunteerStatus.VOLUNTEER_APPLY_AFTER){
            throw new RuntimeException("모집이 종료된 봉사입니다.");
        }else if(volunteer.getVolunteerStatus() == VolunteerStatus.VOLUNTEER_APPLY_BEFORE){
            throw new RuntimeException("신청 기간 전인 봉사입니다.");
        }else if(volunteer.getVolunteerStatus() == VolunteerStatus.VOLUNTEER_APPLY_LIMIT_OVER){
            throw new RuntimeException("인원 마감이 된 봉사입니다.");
        }

    }

    /*
    봉사 신청 취소 로직
     */
    public Apply cancelApply(Long volunteerId, Member member) {

        Apply verifiedApply = verifyCancelableApply(volunteerId, member);

        verifiedApply.setApplyStatus(ApplyStatus.APPLY_CANCEL);
        volunteerService.minusApplyCount(verifiedApply.getVolunteer());

        return applyRepository.save(verifiedApply);
    }

    /*
    신청 취소 가능 여부 확인 로직
     */
    private Apply verifyCancelableApply(Long volunteerId, Member member) {
        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);

        Optional<Apply> optional = applyRepository.findByVolunteerAndMember(volunteer, member);
        Apply apply = optional.orElseThrow(() -> new RuntimeException("해당하는 봉사 활동 신청 이력이 없습니다."));

        if(apply.getApplyStatus() == ApplyStatus.APPLY_CANCEL){
            throw new RuntimeException("이미 취소된 봉사입니다.");
        }

        if(LocalDateTime.now().isAfter(volunteer.getVolunteerDate().minusHours(24))){
            throw new RuntimeException("봉사 날짜 24시간 전에는 취소할 수 없습니다.");
        }

        return apply;

    }

    /*
    특정 사용자 봉사 활동 내역 존재 여부 검증 로직
     */
    public void verifyMemberVolunteer(Volunteer volunteer, Member member) {
        Optional<Apply> optional = applyRepository.findByVolunteerAndMember(volunteer, member);
        optional.orElseThrow(() -> new RuntimeException("봉사 활동 한 내역이 없습니다."));
    }

    public List<Apply> getApplyList(Member member) {
        Optional<List<Apply>> optional = applyRepository.findByMember(member);
        optional.orElseThrow(() -> new RuntimeException("신청한 봉사 활동한 내역이 없습니다."));
    }
}
