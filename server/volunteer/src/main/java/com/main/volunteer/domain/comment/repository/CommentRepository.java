package com.main.volunteer.domain.comment.repository;

import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findCommentByGroup(Group group);
}
