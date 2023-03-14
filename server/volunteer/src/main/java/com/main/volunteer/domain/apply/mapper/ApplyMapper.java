package com.main.volunteer.domain.apply.mapper;


import com.main.volunteer.domain.apply.dto.ApplyDto;
import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.apply.entity.ApplyStatus;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.review.entity.Review;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import org.mapstruct.Mapper;

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
        ApplyStatus applyStatus = apply.getApplyStatus();
        Long memberId = member.getMemberId();
        String memberEmail = member.getEmail();
        String memberName = member.getMemberName();
        Long volunteerId = volunteer.getVolunteerId();

        boolean reviewDone = false;

        List<Review> reviewList = volunteer.getReviewList();
        for (Review review : reviewList) {
            if (Objects.equals(memberId, review.getMember().getMemberId())) {
                reviewDone = true;
                break;
            }
        }

        return new ApplyDto.Response( applyId, applyStatus,memberId, memberEmail, memberName, volunteerId, reviewDone);
    }

    List<ApplyDto.Response> applyListToResponseList(List<Apply> applyList);
}
