package com.main.volunteer.domain.comment.mapper;

import com.main.volunteer.domain.comment.dto.CommentDto;
import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.group.dto.GroupDto;
import com.main.volunteer.domain.group.entity.Group;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "groupId", target = "group.groupId")
    Comment commentPostDtoToComment(CommentDto.Post postDto);
    Comment commentPatchDtoToComment(CommentDto.Patch patchDto);

    @Named("commentToCommentResponseDto")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "group.groupId", target = "groupId")
    CommentDto.Response commentToCommentResponseDto(Comment comment);

    @IterableMapping(qualifiedByName = "commentToCommentResponseDto")
    List<CommentDto.Response> commentsToCommentResponseDtos(List<Comment> comments);
}
