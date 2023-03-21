package com.main.volunteer.domain.comment.service;

import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.comment.repository.CommentRepository;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.group.service.GroupService;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final GroupService groupService;


    public Comment createComment(Comment comment) {
        try {
            verifyComment(comment);
            return commentRepository.save(comment);
        }catch (BusinessException e) {
            throw new BusinessException(ExceptionCode.BOTH_NOT_SET);
        }
    }

    //댓글 상세
    @Transactional(readOnly = true)
    public Comment findComment(long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.COMMENT_NOT_EXIST));

        return comment;
    }

    // 댓글 목록
    public List<Comment> findCommentsByGroup(Group group){

        return commentRepository.findCommentByGroup(group);
    }

    // 댓글 수정
    public Comment updateComment(Comment comment) {

        Comment verifyComment = verifyExistComment(comment.getCommentId());

        Optional.ofNullable(comment.getContent())
                .ifPresent(commentContent -> verifyComment.setContent(commentContent));

        return commentRepository.save(verifyComment);
    }

    // 댓글 삭제
    public void deleteComment(long commentId) {
        Comment comment = verifyExistComment(commentId);
        commentRepository.delete(comment);
    }

    // 댓글 존재 검증
    @Transactional(readOnly = true)
    private Comment verifyExistComment(Long commentId) {
        Optional<Comment> optional = commentRepository.findById(commentId);
        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.COMMENT_NOT_EXIST));
    }

    private void verifyComment(Comment comment){
        if (comment.getMember() == null || comment.getMember().getMemberId() == null) {
            throw new BusinessException(ExceptionCode.MEMBER_NOT_SET);
        }
        if (comment.getGroup() == null || Objects.isNull(comment.getGroup().getGroupId())){
            throw new BusinessException(ExceptionCode.GROUP_NOT_SET);
        }
        memberService.verifiedMember(comment.getMember().getMemberId());
        groupService.verifyExistGroup(comment.getGroup().getGroupId());
    }
}
