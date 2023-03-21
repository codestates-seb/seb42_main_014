package com.main.volunteer.domain.membergroup.mapper;

import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.membergroup.dto.MemberGroupDto;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberGroupMapper {

    public MemberGroup memberGroupDtoToMemberGroup(MemberGroupDto.Post postDto);

    @Mapping(source = "group.groupName", target = "groupName")
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
    default public List<MemberGroupDto.MemberDetails> membeberListToMeberGroupsMemberDtails(List<Member> memberList){
        return memberList.stream().map(
                member -> new MemberGroupDto.MemberDetails(member.getMemberId(), member.getMemberName(), member.getPoint().getPointCount())
        ).collect(Collectors.toList());
    }
}
