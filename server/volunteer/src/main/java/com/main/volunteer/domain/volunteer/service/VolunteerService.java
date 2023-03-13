package com.main.volunteer.domain.volunteer.service;

import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.entity.VolunteerStatus;
import com.main.volunteer.domain.volunteer.repository.VolunteerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class VolunteerService {

    private final VolunteerRepository volunteerRepository;

    public VolunteerService(VolunteerRepository volunteerRepository) {
        this.volunteerRepository = volunteerRepository;
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

    /*
    봉사 등록 가능 날짜 확인 로직
     */
    private void verifyDate(LocalDateTime applyDate, LocalDateTime volunteerDate) {
        LocalDateTime now = LocalDateTime.now();
        //봉사 날짜는 현재보다 이후에 등록 가능
        if(volunteerDate.isBefore(now)){
            throw new RuntimeException("봉사 날짜가 현재 날짜보다 이전입니다.");
        }
         //봉사 날짜는 신청 날짜보다 이후에 등록 가능
        if(volunteerDate.isBefore(applyDate)){
            throw new RuntimeException("봉사 날짜가 신청 시작 날짜보다 이전입니다.");
        }

        //봉사 날짜 48시간 이상일 경우 신청 날짜 등록 가능
        if(applyDate.isAfter(volunteerDate.minusHours(48))){
            throw new RuntimeException("봉사 날짜 48시간 전까지 봉사 등록이 가능합니다.");
        }
    }

    /*
    봉사 삭제 로직
     */
    public void deleteVolunteer(Long volunteerId) {

        //봉사 활동 존재 여부 검증
        Volunteer volunteer = verifyExistVolunteer(volunteerId);

        //봉사 활동 이후에 삭제 불가능
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

    /*
    봉사 정보 update
     */
    public Volunteer updateVolunteer(Volunteer volunteer) {

        //존재한 봉사인지 검증
        Volunteer verifyVolunteer = verifyExistVolunteer(volunteer.getVolunteerId());

        //update 가능한 봉사인지 검증
        verifyUpdatableVolunteer(verifyVolunteer);

        Optional.ofNullable(volunteer.getTitle())
                .ifPresent(verifyVolunteer::setTitle);

        Optional.ofNullable(volunteer.getContent())
                .ifPresent(verifyVolunteer::setContent);

        return volunteerRepository.save(volunteer);
    }



    private void verifyUpdatableVolunteer(Volunteer volunteer) {

    }

    /*
    봉사 활동 신청 시 신청 인원 변경 로직
     */
    public void updateApplyCount(Volunteer volunteer) {
        volunteer.setApplyCount(volunteer.getApplyCount()+1);
        volunteerRepository.save(volunteer);
    }

    /*
    봉사 활동 존재 여부 검증 로직
     */
    public Volunteer verifyExistVolunteer(Long volunteerId) {
        Optional<Volunteer> optional = volunteerRepository.findById(volunteerId);
        return optional.orElseThrow(() -> new RuntimeException("존재하는 봉사활동이 없습니다."));
    }


}
