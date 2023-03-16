package com.main.volunteer.domain.membergroup.mapper;

import com.main.volunteer.domain.membergroup.dto.MemberGroupDto;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberGroupMapper {
    MemberGroupDto.Response memberGroupToMemberGroupResponse(MemberGroup memberGroup);

    List<MemberGroupDto.Response> memberGroupsToMemberGroupsResponses(List<MemberGroup> memberGroupList);
}
