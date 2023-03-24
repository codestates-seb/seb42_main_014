package com.main.volunteer.domain.comment.mapper;

import com.main.volunteer.domain.comment.dto.CommentDto;
import com.main.volunteer.domain.comment.entity.Comment;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {

    @Mapping(source = "groupId", target = "group.groupId")
    Comment commentPostDtoToComment(CommentDto.Post postDto);
    Comment commentPatchDtoToComment(CommentDto.Patch patchDto);

    @Named("commentToCommentResponseDto")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "group.groupId", target = "groupId")
    @Mapping(source = "member.memberName", target = "memberName")
    @Mapping(source = "member.profileImage", target = "profileImage")
    CommentDto.Response commentToCommentResponseDto(Comment comment);

    @IterableMapping(qualifiedByName = "commentToCommentResponseDto")
    List<CommentDto.Response> commentsToCommentResponseDtos(List<Comment> comments);
}
