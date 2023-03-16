package com.main.volunteer.domain.comment.controller;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.comment.dto.CommentDto;
import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.comment.mapper.CommentMapper;
import com.main.volunteer.domain.comment.service.CommentService;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.group.service.GroupService;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/comments")
@AllArgsConstructor
public class CommentController {

    public static final String DEFAULT_URI = "/comments";

    public final CommentMapper mapper;
    private final CommentService commentService;
    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<?> postComment(@RequestBody @Valid CommentDto.Post postDto, @AuthenticationPrincipal CustomUserDetails userDetails){

        Comment comment = mapper.commentPostDtoToComment(postDto);
        comment.setMember(userDetails);
        Comment postComment = commentService.createComment(comment,userDetails);

        URI uri = UriUtil.createUri(DEFAULT_URI, comment.getCommentId());

        return ResponseEntity.created(uri).body(ApiResponse.created("data", mapper.commentToCommentResponseDto(postComment)));
    }


    @GetMapping("/{comment-id}")
    public ResponseEntity<?> getComment(@PathVariable("comment-id") long commentId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Comment comment = commentService.findComment(commentId, userDetails);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(ApiResponse.ok("data", mapper.commentToCommentResponseDto(comment)));
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<?> getComments(@PathVariable("comment-id") long commentId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Group group = groupService.findGroup(commentId);
        List<Comment> commentList = commentService.findComments(group, userDetails);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(ApiResponse.ok("data", mapper.commentsToCommentResponseDtos(commentList)));
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity<?> updateComment(@PathVariable("comment-id") long commentId,@RequestBody CommentDto.Patch patchDto, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Comment comment = mapper.commentPatchDtoToComment(patchDto);
        comment.setCommentId(commentId);

        Group group = comment.getGroup();
        commentService.verifyGroupMember(group, userDetails);
        Comment updatedComment = commentService.updateComment(comment, userDetails);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(ApiResponse.ok("data", mapper.commentToCommentResponseDto(updatedComment)));
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity<?> deleteComment(@PathVariable("comment-id") long commentId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Comment comment = commentService.findComment(commentId, userDetails);
        commentService.verifyGroupMember(comment.getGroup(), userDetails);
        commentService.deleteComment(commentId, userDetails);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}