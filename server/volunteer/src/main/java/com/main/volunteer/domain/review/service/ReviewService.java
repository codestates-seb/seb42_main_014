package com.main.volunteer.domain.review.service;

import com.main.volunteer.domain.review.entity.Review;
import com.main.volunteer.domain.review.repository.ReviewRepository;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.service.VolunteerService;
import com.main.volunteer.member.entity.Member;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final VolunteerService volunteerService;

    public ReviewService(ReviewRepository reviewRepository, VolunteerService volunteerService) {
        this.reviewRepository = reviewRepository;
        this.volunteerService = volunteerService;
    }

    /*
    리뷰 등록 로직
     */
    public Review createReview(Review review, Long volunteerId) {

        verifyCreatableReview(review, volunteerId);

        return reviewRepository.save(review);
    }

    /*
    리뷰 생성 가능 여부 검증 로직
     */
    private void verifyCreatableReview(Review review, Long volunteerId) {

        //봉사 활동 존재 여부 검증
        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);

        review.setVolunteer(volunteer);

        //봉사 활동 이후에 작성 가능
        if (LocalDateTime.now().isBefore(volunteer.getVolunteerDate())) {
            throw new RuntimeException("봉사 날짜 이후에 리뷰 작성이 가능합니다.");
        }

        //봉사 활동 한 사람만 작성 가능
        /*
        추후 개발
        봉사 활동을 한 사람만 리뷰 작성이 가능합니다.
         */

//        review.setMember(new Member());

    }
}
