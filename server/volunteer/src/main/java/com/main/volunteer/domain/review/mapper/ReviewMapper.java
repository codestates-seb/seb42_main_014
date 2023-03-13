package com.main.volunteer.domain.review.mapper;

import com.main.volunteer.domain.review.dto.ReviewDto;
import com.main.volunteer.domain.review.entity.Review;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    Review postDtoToReview(ReviewDto.Post postDto);
}
