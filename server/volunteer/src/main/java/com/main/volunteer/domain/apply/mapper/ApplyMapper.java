package com.main.volunteer.domain.apply.mapper;


import com.main.volunteer.domain.apply.dto.ApplyDto;
import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.apply.entity.ApplyStatus;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.review.entity.Review;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Mapper(componentModel = "spring")
public interface ApplyMapper {
    default ApplyDto.Response applyToResponse(Apply apply){
        if ( apply == null ) {
            return null;
        }

        Member member = apply.getMember();
        Volunteer volunteer = apply.getVolunteer();

        Long applyId = apply.getApplyId();
        Long volunteerId = volunteer.getVolunteerId();
        String volunteerName = volunteer.getTitle();
        LocalDateTime volunteerDate = volunteer.getVolunteerDate();
        LocalDateTime appliedAt = apply.getModifiedAt();
        ApplyStatus applyStatus = apply.getApplyStatus();
        boolean reviewDone = false;
        List<Review> reviewList = volunteer.getReviewList();
        for (Review review : reviewList) {
            if (Objects.equals(member.getMemberId(), review.getMember().getMemberId())) {
                reviewDone = true;
                break;
            }
        }

        return new ApplyDto.Response( applyId,volunteerId, volunteerName, volunteerDate, appliedAt, applyStatus,reviewDone );
    }

    default ApplyDto.ResponseToORG applyToResponseToORG(Apply apply){
        if ( apply == null ) {
            return null;
        }

        Member member = apply.getMember();
        Volunteer volunteer = apply.getVolunteer();

        Long applyId = apply.getApplyId();
        String volunteerName = volunteer.getTitle();
        ApplyStatus applyStatus = apply.getApplyStatus();
        Long memberId = member.getMemberId();
        String profileImage = member.getProfileImage();
        String memberEmail = member.getEmail();
        String memberName = member.getMemberName();

        return new ApplyDto.ResponseToORG( applyId, volunteerName, applyStatus,memberId,profileImage, memberEmail, memberName);
    }

    List<ApplyDto.ResponseToORG> applyListToResponseToORGList(List<Apply> applyList);
    List<ApplyDto.Response> applyListToResponseList(List<Apply> applyList);
}
