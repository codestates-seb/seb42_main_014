package com.main.volunteer.domain.review.mapper;

import com.main.volunteer.domain.review.dto.ReviewDto;
import com.main.volunteer.domain.review.entity.Review;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    Review postDtoToReview(ReviewDto.Post postDto);

    default ReviewDto.Response reviewToResponse(Review review){

        Long volunteerId = review.getVolunteer().getVolunteerId();
        int memberId = review.getMember().getMemberId();

        return new ReviewDto.Response(review.getReviewId(), review.getContent(), memberId, volunteerId );
    }

   List<ReviewDto.Response> reviewListToResponseList(List<Review> reviewList);

    Review patchDtoToReview(ReviewDto.Patch patchDto);
}
