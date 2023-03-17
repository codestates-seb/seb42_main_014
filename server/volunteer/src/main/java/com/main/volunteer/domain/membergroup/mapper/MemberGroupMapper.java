package com.main.volunteer.domain.membergroup.mapper;

import com.main.volunteer.domain.membergroup.dto.MemberGroupDto;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberGroupMapper {

    public MemberGroup memberGroupDtoToMemberGroup(MemberGroupDto.Post postDto);

    MemberGroupDto.Response memberGroupToMemberGroupResponse(MemberGroup memberGroup);

    default public List<MemberGroupDto.Response> memberGroupsToMemberGroupsResponses(List<MemberGroup> memberGroupList){
        List<MemberGroupDto.Response> responses = new ArrayList<>();
        for (MemberGroup memberGroup : memberGroupList) {
            responses.add(MemberGroupDto.Response.builder()
                    .memberGroupId(memberGroup.getMemberGroupId())
                    .memberId(memberGroup.getMember().getMemberId())
                    .groupId(memberGroup.getGroup().getGroupId())
                    .groupName(memberGroup.getGroup().getGroupName())
                    .build());
        }
        return responses;
    }
}
