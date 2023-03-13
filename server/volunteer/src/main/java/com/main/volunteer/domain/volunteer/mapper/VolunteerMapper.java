package com.main.volunteer.domain.volunteer.mapper;


import com.main.volunteer.domain.review.dto.ReviewDto;
import com.main.volunteer.domain.review.entity.Review;
import com.main.volunteer.domain.volunteer.dto.VolunteerDto;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import org.mapstruct.Mapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface VolunteerMapper{

    Volunteer postDtoToVolunteer(VolunteerDto.Post post);

    Volunteer patchDtoToVolunteer(VolunteerDto.Patch patchDto);

    default VolunteerDto.Response volunteerToResponseDto(Volunteer volunteer){
            if ( volunteer == null ) {
                return null;
            }



            String volunteerStatus = null;

            Long volunteerId = volunteer.getVolunteerId();
            String title = volunteer.getTitle();
            LocalDateTime applyDate = volunteer.getApplyDate();
            LocalDateTime volunteerDate = volunteer.getVolunteerDate();
            Integer volunteerTime = volunteer.getVolunteerTime();
            String place = volunteer.getPlace();
            String content = volunteer.getContent();
            Integer applyLimit = volunteer.getApplyLimit();
            Integer applyCount = volunteer.getApplyCount();
            Integer likeCount = volunteer.getLikeCount();
            if ( volunteer.getVolunteerStatus() != null ) {
                volunteerStatus = volunteer.getVolunteerStatus().name();
            }

            Long memberId = volunteer.getMember().getMemberId();
            Long tagId = volunteer.getTag().getTagId();

            VolunteerDto.Response response = new VolunteerDto.Response( volunteerId, title, applyDate, volunteerDate, volunteerTime, place, content, applyLimit, applyCount, likeCount, memberId, tagId, volunteerStatus );

            return response;
    }

    List<VolunteerDto.Response> volunteerListToResponseList(List<Volunteer> volunteerList);
}
