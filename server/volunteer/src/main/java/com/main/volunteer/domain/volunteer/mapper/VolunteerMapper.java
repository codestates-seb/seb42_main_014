package com.main.volunteer.domain.volunteer.mapper;


import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.review.entity.Review;
import com.main.volunteer.domain.volunteer.dto.VolunteerDto;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VolunteerMapper{

    Volunteer postDtoToVolunteer(VolunteerDto.Post post);

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

            Long organizationId = volunteer.getMember().getMemberId();
            Long tagId = volunteer.getTag().getTagId();
            List<Review> reviewList = volunteer.getReviewList();

        return new VolunteerDto.Response( volunteerId, title, applyDate, volunteerDate, volunteerTime, place, content, applyLimit, applyCount, likeCount,organizationId, tagId, volunteerStatus, reviewList);
    }


    List<VolunteerDto.Response> volunteerListToResponseList(List<Volunteer> volunteerList);
    List<VolunteerDto.Response> volunteerPageToResponseList(Page<Volunteer> volunteerList);

}
