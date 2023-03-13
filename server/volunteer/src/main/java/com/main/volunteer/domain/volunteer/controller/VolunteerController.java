package com.main.volunteer.domain.volunteer.controller;


import com.main.volunteer.domain.volunteer.service.VolunteerService;
import com.main.volunteer.member.entity.Member;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.domain.tag.entity.Tag;
import com.main.volunteer.domain.tag.service.TagService;
import com.main.volunteer.util.UriUtil;
import com.main.volunteer.domain.volunteer.dto.VolunteerDto;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.mapper.VolunteerMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import javax.websocket.server.PathParam;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/volunteers")
public class VolunteerController {
    public static final String DEFAULT_URI = "/volunteers";

    private final VolunteerMapper volunteerMapper;
    private final VolunteerService volunteerService;
    private final TagService tagService;

    public VolunteerController(VolunteerMapper volunteerMapper, VolunteerService volunteerService, TagService tagService) {
        this.volunteerMapper = volunteerMapper;
        this.volunteerService = volunteerService;
        this.tagService = tagService;
    }


    /*
    봉사 등록 - 봉사 기관만 가능
     */
    //    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<?> postVolunteer(@RequestBody @Valid VolunteerDto.Post postDto, @PathParam("member-id") int memberId){

        Tag tag = tagService.getTag(postDto.getTagName());
        Volunteer volunteer = volunteerMapper.postDtoToVolunteer(postDto);
        volunteer.setTag(tag);


        Member member = new Member();//jwt 구현후 수정 예정
        member.setMemberId(memberId);//jwt 구현후 수정 예정
        volunteer.setMember(member);

        Volunteer createdVolunteer = volunteerService.createVolunteer(volunteer);

        URI uri = UriUtil.createUri(DEFAULT_URI, createdVolunteer.getVolunteerId());
        return ResponseEntity.created(uri).body(ApiResponse.created("data", volunteerMapper.volunteerToResponseDto(createdVolunteer)));
    }

    /*
    봉사 삭제 - 봉사 기관만 가능
     */
    //    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{volunteer-id}")
    public ResponseEntity<?> deleteVolunteer(@Positive @PathVariable("volunteer-id") Long volunteerId){

        volunteerService.deleteVolunteer(volunteerId);

        return ResponseEntity.noContent().build();
    }
    /*
    특정 봉사 조회
     */
    @GetMapping("/{volunteer-id}")
    public ResponseEntity<?> getVolunteer(@PathVariable("volunteer-id") @Positive Long volunteerId){
        Volunteer volunteer = volunteerService.getVolunteer(volunteerId);

        return ResponseEntity.ok().body(ApiResponse.ok("data", volunteerMapper.volunteerToResponseDto(volunteer)));
    }

    /*
    봉사 목록 조회 - ALL
     */
    @GetMapping()
    public ResponseEntity<?> getVolunteerList(){

        List<Volunteer> volunteerList = volunteerService.getVolunteerList();

        return ResponseEntity.ok().body(ApiResponse.ok("data", volunteerMapper.volunteerListToResponseList(volunteerList)));
    }

    /*
    봉사 목록 조회 - TAG 별
     */
    @GetMapping("/tags/{tag-id}")
    public ResponseEntity<?> getVolunteerListByTag(@PathVariable("tag-id") Long tagId){

        List<Volunteer> volunteerList = volunteerService.getVolunteerListByTag(tagId);

        return ResponseEntity.ok().body(ApiResponse.ok("data", volunteerMapper.volunteerListToResponseList(volunteerList)));
    }







}
