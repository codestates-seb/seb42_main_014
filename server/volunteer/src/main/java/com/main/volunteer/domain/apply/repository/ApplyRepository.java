package com.main.volunteer.domain.apply.repository;

import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.apply.entity.ApplyStatus;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.entity.VolunteerStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplyRepository extends JpaRepository<Apply, Long> {


    Optional<Apply> findByVolunteerAndMember(Volunteer volunteer, Member member);

    Optional<Page<Apply>> findByMemberAndVolunteer_VolunteerStatusNotAndApplyStatus(Pageable pageable, Member member, VolunteerStatus volunteerStatus, ApplyStatus applyStatus);

    Optional<Page<Apply>> findByMemberAndVolunteer_VolunteerStatusAndApplyStatus(Pageable pageable, Member member, VolunteerStatus volunteerStatus, ApplyStatus applyStatus);

    Optional<Page<Apply>> findAllByVolunteerAndApplyStatus(Pageable pageable, Volunteer volunteer, ApplyStatus applyStatus);
}
