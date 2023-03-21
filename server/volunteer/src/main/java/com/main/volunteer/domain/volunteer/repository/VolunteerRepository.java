package com.main.volunteer.domain.volunteer.repository;


import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.repository.custom.VolunteerRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long> , VolunteerRepositoryCustom {

    Optional<Page<Volunteer>> findAllByMember(Pageable pageable, Member member);

}
