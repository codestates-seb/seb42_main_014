package com.main.volunteer.domain.comment.service;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.comment.repository.CommentRepository;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.group.service.GroupService;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final GroupService groupService;


    public Comment createComment(Comment comment, CustomUserDetails userDetails) {
        verifyComment(comment);
        verifyGroupMember(comment.getGroup(), userDetails);
        return commentRepository.save(comment);
    }

    //댓글 상세
    @Transactional(readOnly = true)
    public Comment findComment(long commentId, CustomUserDetails userDetails) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.COMMENT_NOT_EXIST));
        verifyGroupMember(comment.getGroup(), userDetails);
        return comment;
    }

    // 댓글 목록
    public List<Comment> findComments(Group group, CustomUserDetails userDetails){
        verifyGroupMember(group, userDetails);
        return commentRepository.findAll();
    }

    // 댓글 수정
    public Comment updateComment(Comment comment, CustomUserDetails userDetails) {

        Comment verifyComment = verifyExistComment(comment.getCommentId());
        verifyGroupMember(verifyComment.getGroup(), userDetails);

        Optional.ofNullable(comment.getContent())
                .ifPresent(commentContent -> verifyComment.setContent(commentContent));

        return commentRepository.save(comment);
    }

    // 댓글 삭제
    public void deleteComment(long commentId, CustomUserDetails userDetails) {

        Comment comment = verifyExistComment(commentId);
        verifyGroupMember(comment.getGroup(), userDetails);
        commentRepository.delete(comment);
    }

    // 댓글 존재 검증
    @Transactional(readOnly = true)
    private Comment verifyExistComment(Long commentId) {
        Optional<Comment> optional = commentRepository.findById(commentId);
        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.COMMENT_NOT_EXIST));
    }

    private void verifyComment(Comment comment){
        memberService.verifiedMember(comment.getMember().getMemberId());
        groupService.verifyExistGroup(comment.getGroup().getGroupId());
    }

    public void verifyGroupMember(Group group, CustomUserDetails userDetails) {
        List<MemberGroup> members = group.getMemberGroups();

        boolean isMember = members.stream().anyMatch(member -> member.getMember().getMemberId() == userDetails.getMemberId());

        if (!isMember) {
            throw new BusinessException(ExceptionCode.NOT_GROUP_MEMBER);
        }
    }
}
