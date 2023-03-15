package com.main.volunteer.domain.comment.service;

import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.comment.repository.CommentRepository;
import com.main.volunteer.domain.group.service.GroupService;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final GroupService groupService;

    public CommentService(CommentRepository commentRepository, MemberService memberService, GroupService groupService) {
        this.commentRepository = commentRepository;
        this.memberService = memberService;
        this.groupService = groupService;
    }

    public Comment createComment(Comment comment) {
        verifyComment(comment);
        return commentRepository.save(comment);
    }

    //댓글 상세
    @Transactional(readOnly = true)
    public Comment findComment(long commentId) {
        return verifyExistComment(commentId);
    }

    // 댓글 목록
    public List<Comment> findComments(){
        return commentRepository.findAll();
    }

    // 댓글 수정
    public Comment updateComment(Comment comment) {

        Comment verifyComment = verifyExistComment(comment.getCommentId());

        Optional.ofNullable(comment.getContent())
                .ifPresent(commentContent -> verifyComment.setContent(commentContent));

        return commentRepository.save(comment);
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
        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.COMMENT_EXIST));
    }

    //멤버, 그룹이 존재 하는지 검증
    private void verifyComment(Comment comment){
        memberService.verifiedMember(comment.getMember().getMemberId());
        groupService.verifyExistGroup(comment.getGroup().getGroupId());
    }
}
