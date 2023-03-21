package com.main.volunteer.domain.like.repository;

import com.main.volunteer.domain.like.entity.Like;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByVolunteerAndMember(Volunteer volunteer, Member member);

    Optional<Page<Like>> findAllByMember(Pageable pageable, Member member);
}
