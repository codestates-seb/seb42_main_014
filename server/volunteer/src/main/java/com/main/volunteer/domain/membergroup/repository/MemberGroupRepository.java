package com.main.volunteer.domain.membergroup.repository;

import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberGroupRepository extends JpaRepository<MemberGroup, Long>{
    Optional<MemberGroup> findByMemberAndGroup(Member member, Group group);
    List<MemberGroup> findByMemberMemberId(Long memberId);
}
