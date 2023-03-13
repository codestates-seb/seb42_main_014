package com.main.volunteer.domain.review.controller;

import com.main.volunteer.domain.review.dto.ReviewDto;
import com.main.volunteer.domain.review.entity.Review;
import com.main.volunteer.domain.review.mapper.ReviewMapper;
import com.main.volunteer.domain.review.service.ReviewService;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    public static final String DEFAULT_URI = "/reviews";

    private final ReviewMapper reviewMapper;
    private final ReviewService reviewService;


    public ReviewController(ReviewMapper reviewMapper, ReviewService reviewService) {
        this.reviewMapper = reviewMapper;
        this.reviewService = reviewService;
    }


    @PostMapping("/{volunteer-id}")
    public ResponseEntity<?> postReview(@RequestBody @Valid ReviewDto.Post postDto, @PathVariable("volunteer-id") Long volunteerId) {
        Review review = reviewMapper.postDtoToReview(postDto);

        Review createdReview = reviewService.createReview(review, volunteerId);


        URI uri = UriUtil.createUri(DEFAULT_URI, createdReview.getReviewId());
        return ResponseEntity.created(uri).body(ApiResponse.created());

    }
}
