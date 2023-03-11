package com.main.volunteer.volunteer.service;

import com.main.volunteer.volunteer.entity.Volunteer;
import com.main.volunteer.volunteer.repository.VolunteerRepository;
import org.springframework.stereotype.Service;

@Service
public class VolunteerService {

    private final VolunteerRepository volunteerRepository;

    public VolunteerService(VolunteerRepository volunteerRepository) {
        this.volunteerRepository = volunteerRepository;
    }

    public void createVolunteer(Volunteer volunteer) {
        volunteerRepository.save(volunteer);

    }
}
