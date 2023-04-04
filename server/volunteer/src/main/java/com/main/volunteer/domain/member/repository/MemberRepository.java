package com.main.volunteer.domain.member.repository;

import com.main.volunteer.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByMemberName(String memberName);

    Optional<List<Member>> findByMemberNameContaining(String keyword);

}
