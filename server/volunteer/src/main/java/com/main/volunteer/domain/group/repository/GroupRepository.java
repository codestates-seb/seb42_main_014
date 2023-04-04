package com.main.volunteer.domain.group.repository;

import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
 Optional<Group> findByGroupIdAndMember(long groupId, Member member);
}
