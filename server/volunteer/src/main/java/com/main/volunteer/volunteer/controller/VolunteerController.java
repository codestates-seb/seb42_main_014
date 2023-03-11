package com.main.volunteer.volunteer.controller;


import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import com.main.volunteer.volunteer.dto.VolunteerDto;
import com.main.volunteer.volunteer.entity.Volunteer;
import com.main.volunteer.volunteer.mapper.VolunteerMapper;
import com.main.volunteer.volunteer.service.VolunteerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

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


    @PostMapping
    public ResponseEntity<?> postVolunteer(@RequestBody @Valid VolunteerDto.Post postDto){

        Volunteer volunteer = volunteerMapper.postDtoToVolunteer(postDto);

        Volunteer createdVolunteer = volunteerService.createVolunteer(volunteer);

        URI uri = UriUtil.createUri(DEFAULT_URI, createdVolunteer.getVolunteerId());
        return ResponseEntity.created(uri).body(ApiResponse.created());
    }


//    @PatchMapping
//    public ResponseEntity<?> patchVolunteer(@RequestBody @Valid VolunteerDto.Patch patchDto) {
//
//        Volunteer volunteer = volunteerMapper.patchDtoToVolunteer(patchDto);
//
//        Volunteer patchedVolunteer = volunteerService.updateVolunteer(volunteer);
//
//        return ResponseEntity.ok(ApiResponse.ok("data", ))
//    }

}
