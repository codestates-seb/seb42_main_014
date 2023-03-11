package com.main.volunteer.volunteer.service;

import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import com.main.volunteer.volunteer.entity.Volunteer;
import com.main.volunteer.volunteer.repository.VolunteerRepository;
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
        volunteerRepository.save(volunteer);

        return volunteer;
    }

    /*
    봉사 등록 가능한 날짜인지 확인 로직
     */
    private void verifyDate(LocalDateTime applyDate, LocalDateTime volunteerDate) {
        LocalDateTime now = LocalDateTime.now();
        if(volunteerDate.isBefore(now)){
            throw new RuntimeException("봉사 날짜가 현재 날짜보다 이전입니다.");
        }

        if(volunteerDate.isBefore(applyDate)){
            throw new RuntimeException("봉사 날짜가 신청 시작 날짜보다 이전입니다.");
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

    private Volunteer verifyExistVolunteer(Long volunteerId) {
        Optional<Volunteer> optional = volunteerRepository.findById(volunteerId);
        return optional.orElseThrow(() -> new RuntimeException("존재하는 봉사활동이 없습니다."));
    }
}
