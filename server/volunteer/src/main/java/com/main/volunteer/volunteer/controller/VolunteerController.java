package com.main.volunteer.volunteer.controller;


import com.main.volunteer.volunteer.dto.VolunteerDto;
import com.main.volunteer.volunteer.entity.Volunteer;
import com.main.volunteer.volunteer.mapper.VolunteerMapper;
import com.main.volunteer.volunteer.service.VolunteerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/volunteers")

public class VolunteerController {
    public static final String DEFAULT_URI = "/volunteers";

    private final VolunteerMapper volunteerMapper;
    private final VolunteerService volunteerService;

    public VolunteerController(VolunteerMapper volunteerMapper, VolunteerService volunteerService) {
        this.volunteerMapper = volunteerMapper;
        this.volunteerService = volunteerService;
    }


//    @PostMapping
//    public ResponseEntity<?> postVolunteer(@RequestBody @Valid VolunteerDto.Post postDto){
//
//        Volunteer volunteer = volunteerMapper.postDtoToVolunteer(postDto);
//
//        volunteerService.createVolunteer(volunteer);
//
//
//        return new ResponseEntity.ok();
//    }

}
