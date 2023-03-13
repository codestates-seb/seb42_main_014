package com.main.volunteer.domain.review.service;

import com.main.volunteer.domain.apply.service.ApplyService;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.review.entity.Review;
import com.main.volunteer.domain.review.repository.ReviewRepository;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.service.VolunteerService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    리뷰 등록 로직
     */
    public Review createReview(Review review, Long volunteerId) {


        Volunteer volunteer = verifyCreatableReview(review, volunteerId);

        verifyOnceReview(review.getMember(), volunteer);

        return reviewRepository.save(review);
    }

    private void verifyOnceReview(Member member, Volunteer volunteer) {
        Optional<Review> optional = reviewRepository.findByMemberAndVolunteer(member, volunteer);
        if (optional.isPresent()) {
            throw new RuntimeException("활동한 봉사에 대한 리뷰가 이미 작성되었습니다.");
        }
    }

    /*
    리뷰 생성 가능 여부 검증 로직
     */
    private Volunteer verifyCreatableReview(Review review, Long volunteerId) {

        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);

        //봉사 활동 한 사람만 작성 가능
        applyService.verifyMemberVolunteer(volunteer, review.getMember());

        review.setVolunteer(volunteer);

        //봉사 활동 이후에 작성 가능
//        if (LocalDateTime.now().isBefore(volunteer.getVolunteerDate())) {
//            throw new RuntimeException("봉사 날짜 이후에 리뷰 작성이 가능합니다.");
//        }

        return volunteer;
    }

    /*
    내가 쓴 후기 목록 보기
     */
    public List<Review> getMyReviewList(Member member) {

        Optional<List<Review>> optional = reviewRepository.findAllByMember(member);
        return optional.orElseThrow(() -> new RuntimeException("등록한 후기가 없습니다."));
    }

    /*
    특정 봉사 활동에서 내가 쓴 후기 보기
     */
    public Review getMyReview(Long volunteerId, Member member) {
        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);

        Optional<Review> optional = reviewRepository.findByMemberAndVolunteer(member, volunteer);
        return optional.orElseThrow(() -> new RuntimeException("해당 봉사 활동에 등록된 후기가 없습니다."));
    }

    /*
    특정 봉사 활동에서 후기 목록 보기
     */
    public List<Review> getReviewList(Long volunteerId) {
        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);

        Optional<List<Review>> optional = reviewRepository.findAllByVolunteer(volunteer);
        return optional.orElseThrow(() -> new RuntimeException("해당 봉사 활동에 등록된 후기가 없습니다."));
    }

    public Review patchReview(Review review) {
        Review verifiedReview = verifyExistReview(review.getReviewId(), review.getMember());

        Optional.ofNullable(review.getContent())
                .ifPresent(verifiedReview::setContent);

        return reviewRepository.save(verifiedReview);
    }

    public void deleteReview(Long reviewId, Member member) {
        Review verifiedReview = verifyExistReview(reviewId, member);
        reviewRepository.delete(verifiedReview);
    }


    private Review verifyExistReview(Long reviewId, Member member) {
        Optional<Review> optional = reviewRepository.findByReviewIdAndMember(reviewId, member);
        return optional.orElseThrow(() -> new RuntimeException("해당 봉사 활동에 등록된 후기가 없습니다."));
    }
}


