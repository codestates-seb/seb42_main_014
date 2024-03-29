package com.main.volunteer.domain.review.service;

import com.main.volunteer.domain.apply.service.ApplyService;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.review.entity.Review;
import com.main.volunteer.domain.review.repository.ReviewRepository;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.entity.VolunteerStatus;
import com.main.volunteer.domain.volunteer.service.VolunteerService;
import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final VolunteerService volunteerService;
    private final ApplyService applyService;


    public ReviewService(ReviewRepository reviewRepository, VolunteerService volunteerService, ApplyService applyService) {
        this.reviewRepository = reviewRepository;
        this.volunteerService = volunteerService;
        this.applyService = applyService;
    }

    /*
    후기 등록 로직
     */
    public Review createReview(Review review, Long volunteerId) {

        Volunteer volunteer = verifyCreatableReview(review, volunteerId);

        verifyOnceReview(review.getMember(), volunteer);

        return reviewRepository.save(review);
    }

    /*
    후기 수정 로직
     */
    public Review patchReview(Review review) {

        Review verifiedReview = verifyExistReview(review.getReviewId(), review.getMember());

        Optional.ofNullable(review.getContent())
                .ifPresent(verifiedReview::setContent);

        return reviewRepository.save(verifiedReview);
    }

    /*
    후기 삭제 로직
     */
    public void deleteReview(Long reviewId, Member member) {

        Review verifiedReview = verifyExistReview(reviewId, member);

        reviewRepository.delete(verifiedReview);
    }

    /*
    내가 쓴 후기 목록 보기
     */
    public List<Review> getMyReviewList(Member member) {

        Optional<List<Review>> optional = reviewRepository.findAllByMember(member);

        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.REVIEW_NOT_EXIST));
    }

    /*
    특정 봉사 활동에서 내가 쓴 후기 보기
     */
    public Review getMyReview(Long volunteerId, Member member) {
        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);

        Optional<Review> optional = reviewRepository.findByMemberAndVolunteer(member, volunteer);

        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.REVIEW_NOT_EXIST));
    }

    /*
    특정 봉사 활동에서 후기 목록 보기
     */
    public List<Review> getReviewList(Long volunteerId) {
        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);

        Optional<List<Review>> optional = reviewRepository.findAllByVolunteer(volunteer);

        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.REVIEW_NOT_EXIST));
    }

    // 리뷰 생성 가능 여부 검증 로직
    private Volunteer verifyCreatableReview(Review review, Long volunteerId) {

        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);

        applyService.verifyMemberVolunteer(volunteer, review.getMember());

        review.setVolunteer(volunteer);

        if (!(volunteer.getVolunteerStatus()== VolunteerStatus.VOLUNTEER_AFTER)) {
            throw new BusinessException(ExceptionCode.NOT_AFTER_VOLUNTEER_DATE);
        }

        return volunteer;
    }

    // 리뷰 작성 내역 검증 로직
    private void verifyOnceReview(Member member, Volunteer volunteer) {
        Optional<Review> optional = reviewRepository.findByMemberAndVolunteer(member, volunteer);

        if (optional.isPresent()) {
            throw new BusinessException(ExceptionCode.ONCE_REVIEW);
        }
    }

    // 리뷰 존재 검증 로직
    private Review verifyExistReview(Long reviewId, Member member) {
        Optional<Review> optional = reviewRepository.findByReviewIdAndMember(reviewId, member);

        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.REVIEW_NOT_EXIST));
    }

}


