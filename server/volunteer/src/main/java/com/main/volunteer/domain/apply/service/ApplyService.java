package com.main.volunteer.domain.apply.service;

import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.apply.entity.ApplyStatus;
import com.main.volunteer.domain.apply.repository.ApplyRepository;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.entity.VolunteerStatus;
import com.main.volunteer.domain.volunteer.service.VolunteerService;
import org.springframework.stereotype.Service;

@Service
public class ApplyService {

    private final VolunteerService volunteerService;
    private final ApplyRepository applyRepository;

    public ApplyService(VolunteerService volunteerService, ApplyRepository applyRepository) {
        this.volunteerService = volunteerService;
        this.applyRepository = applyRepository;
    }

    public Apply createApply(Apply apply, Long volunteerId) {

        verifyCreatableApply(apply, volunteerId);

        apply.setApplyStatus(ApplyStatus.APPLY_COMPLETE);
        Apply createdApply = applyRepository.save(apply);
        volunteerService.updateApplyCount(createdApply.getVolunteer());

        return createdApply;
    }


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
}
