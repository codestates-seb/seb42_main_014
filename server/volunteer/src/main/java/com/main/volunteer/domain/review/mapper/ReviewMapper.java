package com.main.volunteer.domain.review.mapper;

import com.main.volunteer.domain.review.dto.ReviewDto;
import com.main.volunteer.domain.review.entity.Review;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    Review postDtoToReview(ReviewDto.Post postDto);

    default ReviewDto.Response reviewToResponse(Review review){

        Long volunteerId = review.getVolunteer().getVolunteerId();
        String profileImage = review.getMember().getProfileImage();

        return new ReviewDto.Response(review.getReviewId(),volunteerId,review.getMember().getMemberName(), profileImage, review.getContent(), review.getModifiedAt());
    }

   List<ReviewDto.Response> reviewListToResponseList(List<Review> reviewList);

    Review patchDtoToReview(ReviewDto.Patch patchDto);
}
