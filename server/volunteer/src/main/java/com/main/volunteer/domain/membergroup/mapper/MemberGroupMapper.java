package com.main.volunteer.domain.membergroup.mapper;

import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.membergroup.dto.MemberGroupDto;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberGroupMapper {
    MemberGroupMapper INSTANCE = Mappers.getMapper(MemberGroupMapper.class);
    default MemberGroupDto.Response memberGroupToMemberGroupResponse(MemberGroup memberGroup) {
        Member member = memberGroup.getMember();
        Group group = memberGroup.getGroup();

        long memberGroupId = memberGroup.getMemberGroupId();
        long memberId = member.getMemberId();
        long groupId = group.getGroupId();

        return new MemberGroupDto.Response(memberGroupId, memberId, groupId);
    }

    List<MemberGroupDto.Response> memberGroupsToMemberGroupsResponses(List<MemberGroup> memberGroupList);
}
