package com.main.volunteer.domain.comment.repository;

import com.main.volunteer.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
