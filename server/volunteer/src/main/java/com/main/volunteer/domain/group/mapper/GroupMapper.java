package com.main.volunteer.domain.group.mapper;

import com.main.volunteer.domain.group.dto.GroupDto;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GroupMapper {

    Group groupPostDtoToGroup(GroupDto.Post postDto);
    Group groupPatchDtoToGroup(GroupDto.Patch patchDto);
    @Mapping(source = "member.memberId", target = "groupZangId")
   default GroupDto.Response groupToGroupResponseDto(Group group, boolean groupMember) {

       long groupId = group.getGroupId();
       String groupName = group.getGroupName();
       String groupImage = group.getGroupImage();
       long groupZangId = group.getGroupZangId();
       int applyLimit = group.getApplyLimit();
       String place = group.getPlace();
       String content = group.getContent();
       long tagId = group.getTag().getTagId();
       String tagName = group.getTag().getTagName();

       return new GroupDto.Response(groupId, groupName, groupImage, groupZangId, applyLimit, place, content,tagId,tagName, groupMember);
   }

    List<GroupDto.Response> GroupsToGroupResponseDtos(List<Group> groups);

}
