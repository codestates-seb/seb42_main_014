package com.main.volunteer.domain.group.mapper;

import com.main.volunteer.domain.comment.dto.CommentDto;
import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.group.dto.GroupDto;
import com.main.volunteer.domain.group.entity.Group;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GroupMapper {

    Group groupPostDtoToGroup(GroupDto.Post postDto);
    Group groupPatchDtoToGroup(GroupDto.Patch patchDto);

    GroupDto.Response GroupToGroupResponseDto(Group group);

    List<GroupDto.Response> GroupToGroupResponseDtos(List<Group> groups);
    List<CommentDto.Response> commentToCommentResponseDtos(List<Comment> comment);

}
