package com.main.volunteer.domain.apply.repository;

import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.entity.VolunteerStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplyRepository extends JpaRepository<Apply, Long> {


    Optional<Apply> findByVolunteerAndMember(Volunteer volunteer, Member member);

    Optional<List<Apply>> findByMemberAndVolunteer_VolunteerStatusNot(Member member, VolunteerStatus volunteerStatus);

    Optional<List<Apply>> findByMemberAndVolunteer_VolunteerStatus(Member member, VolunteerStatus volunteerStatus);

    Optional<List<Apply>> findAllByVolunteer(Volunteer volunteer);
}
