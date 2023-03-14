package com.main.volunteer.domain.comment.controller;

import com.main.volunteer.domain.comment.dto.CommentDto;
import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.comment.mapper.CommentMapper;
import com.main.volunteer.domain.comment.service.CommentService;
import com.main.volunteer.util.UriUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public ResponseEntity<?> postComment(@RequestBody @Valid CommentDto.Post postDto){

        Comment comment = commentService.createComment(mapper.commentPostDtoToComment(postDto));
        URI uri = UriUtil.createUri(DEFAULT_URI, comment.getCommentId());

        CommentDto.Response response = mapper.commentToCommentResponseDto(comment);

        return ResponseEntity.created(uri).body(response);
    }


    @GetMapping("/{comment-id}")
    public ResponseEntity<?> getComment(@PathVariable("comment-id") long commentId) {

        Comment comment = commentService.findComment(commentId);
        CommentDto.Response response = mapper.commentToCommentResponseDto(comment);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    @GetMapping
    public ResponseEntity<?> getComments() {

        List<Comment> commentList = commentService.findComments();
        List<CommentDto.Response> responses = mapper.commentsToCommentResponseDtos(commentList);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(responses);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity<?> updateComment(@PathVariable("comment-id") long commentId, @Valid @RequestBody CommentDto.Patch patchDto) {

        Comment comment = commentService.updateComment(mapper.commentPatchDtoToComment(patchDto));
        CommentDto.Response response = mapper.commentToCommentResponseDto(comment);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity<?> deleteComment(@PathVariable("comment-id") long commentId) {

        commentService.deleteComment(commentId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
