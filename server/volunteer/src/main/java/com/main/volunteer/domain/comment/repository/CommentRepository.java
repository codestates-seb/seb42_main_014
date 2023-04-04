package com.main.volunteer.domain.comment.repository;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findCommentByGroup(Group group);

    Optional<Comment> findByCommentIdAndMember(long commentId, Member member);
}
