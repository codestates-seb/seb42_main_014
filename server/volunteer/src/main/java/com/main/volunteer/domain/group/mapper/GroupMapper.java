package com.main.volunteer.domain.group.mapper;

import com.main.volunteer.domain.group.dto.GroupDto;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.membergroup.dto.MemberGroupDto;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

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


    default public List<GroupDto.Response> GroupsToGroupResponseDtos(List<Group> groups, List<MemberGroup> memberGroups){

        List<Long> myGroupList;
        if(memberGroups != null) {
            myGroupList =
                    memberGroups.stream().map(
                            membergroup -> new Long(membergroup.getGroupId())
                    ).collect(Collectors.toList());
        } else {
            myGroupList = null;
        }

        return groups.stream().map(
                group -> new GroupDto.Response(
                        group.getGroupId(),
                        group.getGroupName(),
                        group.getGroupImage(),
                        group.getGroupZangId(),
                        group.getApplyLimit(),
                        group.getPlace(),
                        group.getContent(),
                        group.getTag().getTagId(),
                        group.getTag().getTagName(),
                        memberGroups == null ? false : myGroupList.contains(group.getGroupId())
                )
        ).collect(Collectors.toList());
    }

}
