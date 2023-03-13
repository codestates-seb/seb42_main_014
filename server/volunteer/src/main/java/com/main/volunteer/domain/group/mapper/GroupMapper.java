package com.main.volunteer.domain.group.mapper;

import com.main.volunteer.domain.comment.dto.CommentDto;
import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.group.dto.GroupDto;
import com.main.volunteer.domain.group.entity.Group;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GroupMapper {

    Group groupPostDtoToGroup(GroupDto.Post postDto);
    Group groupPatchDtoToGroup(GroupDto.Patch patchDto);


    GroupDto.Response GroupToGroupResponseDto(Group group);

    List<GroupDto.Response> GroupToGroupResponseDtos(List<Group> groups);

    @Mapping(target = "memberId", source = "member.memberId")
    @Mapping(target = "groupId", source = "group.groupId")
    CommentDto.Response commentToCommentResponseDto(Comment comment);

    //List<CommentDto.Response> commentsToCommentResponseDtos(List<Comment> comments);

}
