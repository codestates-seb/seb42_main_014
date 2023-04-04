package com.main.volunteer.domain.review.controller;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.domain.review.dto.ReviewDto;
import com.main.volunteer.domain.review.entity.Review;
import com.main.volunteer.domain.review.mapper.ReviewMapper;
import com.main.volunteer.domain.review.service.ReviewService;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    public static final String DEFAULT_URI = "/reviews";

    private final ReviewMapper reviewMapper;
    private final ReviewService reviewService;
    private final MemberService memberService;


    public ReviewController(ReviewMapper reviewMapper, ReviewService reviewService, MemberService memberService) {
        this.reviewMapper = reviewMapper;
        this.reviewService = reviewService;
        this.memberService = memberService;
    }

    /*
    후기 작성
     */
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/{volunteer-id}")
    public ResponseEntity<?> postReview(@RequestBody @Valid ReviewDto.Post postDto, @PathVariable("volunteer-id") Long volunteerId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Review review = reviewMapper.postDtoToReview(postDto);
        review.setMember(memberService.findMember(userDetails.getMemberId()));

        Review createdReview = reviewService.createReview(review, volunteerId);
        URI uri = UriUtil.createUri(DEFAULT_URI, createdReview.getReviewId());

        return ResponseEntity.created(uri).body(ApiResponse.created("data", reviewMapper.reviewToResponse(createdReview)));

    }

    /*
    후기 수정
     */
    @PreAuthorize("isAuthenticated()")
    @PatchMapping("/{review-id}")
    public ResponseEntity<?> patchMyReview(@PathVariable("review-id") Long reviewId, @RequestBody ReviewDto.Patch patchDto,  @AuthenticationPrincipal CustomUserDetails userDetails) {

        Review review = reviewMapper.patchDtoToReview(patchDto);
        review.setReviewId(reviewId);
        review.setMember(memberService.findMember(userDetails.getMemberId()));

        Review patchedMyReview = reviewService.patchReview(review);

        return ResponseEntity.ok().body(ApiResponse.ok("data", reviewMapper.reviewToResponse(patchedMyReview)));
    }

    /*
    후기 삭제
     */
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{review-id}")
    public ResponseEntity<?> deleteMyReview(@PathVariable("review-id") Long reviewId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        reviewService.deleteReview(reviewId, memberService.findMember(userDetails.getMemberId()));

        return ResponseEntity.noContent().build();
    }

    /*
    내가 쓴 후기 목록 조회
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my")
    public ResponseEntity<?> getMyReviews(@AuthenticationPrincipal CustomUserDetails userDetails) {

        List<Review> MyReviewList = reviewService.getMyReviewList(memberService.findMember(userDetails.getMemberId()));

        return ResponseEntity.ok().body(ApiResponse.ok("data", reviewMapper.reviewListToResponseList(MyReviewList)));
    }

    /*
    특정 봉사활동에서 내가 쓴 후기 조회
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my/{volunteer-id}")
    public ResponseEntity<?> getMyReview(@PathVariable("volunteer-id") Long volunteerId, @AuthenticationPrincipal CustomUserDetails userDetails){

        Review myReview = reviewService.getMyReview(volunteerId, memberService.findMember(userDetails.getMemberId()));

        return ResponseEntity.ok().body(ApiResponse.ok("data", reviewMapper.reviewToResponse(myReview)));
    }

    /*
    특정 봉사활동에서 후기 목록 조회
     */
    @GetMapping("/{volunteer-id}")
    public ResponseEntity<?> getReviews(@PathVariable("volunteer-id") Long volunteerId){

        List<Review> reviewList = reviewService.getReviewList(volunteerId);

        return ResponseEntity.ok().body(ApiResponse.ok("data", reviewMapper.reviewListToResponseList(reviewList)));
    }

}
