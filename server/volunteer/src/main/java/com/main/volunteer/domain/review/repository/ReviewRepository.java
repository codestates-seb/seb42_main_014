package com.main.volunteer.domain.review.repository;

import com.main.volunteer.domain.review.entity.Review;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<List<Review>> findAllByMember(Member member);

    Optional<Review> findByMemberAndVolunteer(Member member, Volunteer volunteer);

    Optional<List<Review>> findAllByVolunteer(Volunteer volunteer);
}
