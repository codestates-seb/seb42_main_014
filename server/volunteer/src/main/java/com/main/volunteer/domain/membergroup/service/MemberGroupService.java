package com.main.volunteer.domain.membergroup.service;

import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.group.service.GroupService;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import com.main.volunteer.domain.membergroup.repository.MemberGroupRepository;
import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberGroupService {

    private final GroupService groupService;
    private final MemberService memberService;
    private final MemberGroupRepository memberGroupRepository;

    public MemberGroup createMemberGroup(MemberGroup memberGroup) {

        if(verifyExistMemberGroup(memberGroup.getGroupId(), memberGroup.getMemberId())){
            throw new BusinessException(ExceptionCode.MEMBER_GROUP_EXIST);
        }

        Group group = groupService.verifyExistGroup(memberGroup.getGroupId());
        Member member = memberService.verifiedMember(memberGroup.getMemberId());

        memberGroup.setGroup(group);
        memberGroup.setMember(member);

        return memberGroupRepository.save(memberGroup);
    }

    public List<MemberGroup> findMemberGroupsByMemberId(long memberId) {

        Member member = memberService.verifiedMember(memberId);
        List<MemberGroup> memberGroups = memberGroupRepository.findByMember(member);
        if (memberGroups == null || memberGroups.isEmpty()) {
            throw new BusinessException(ExceptionCode.MEMBER_GROUP_NOT_EXIST);
        }
        return memberGroups;
    }

//    public MemberGroup updateMemberGroup(MemberGroup memberGroup) {
//
//    }
//    public MemberGroup deleteMemberGroup(long groupId, long memberId){
//
//    }

    private boolean verifyExistMemberGroup(long memberId, long groupId) {

        Member member = memberService.verifiedMember(memberId);
        Group group = groupService.verifyExistGroup(groupId);

        return memberGroupRepository.findByMemberAndGroup(member, group).isPresent();
    }

    public List<MemberGroup> findMemberGroupsByGroupId(long groupId) {

        Group group = groupService.verifyExistGroup(groupId);

        List<MemberGroup> memberGroups = memberGroupRepository.findByGroup(group);
        if (memberGroups == null || memberGroups.isEmpty()) {
            throw new BusinessException(ExceptionCode.MEMBER_GROUP_NOT_EXIST);
        }
        return memberGroups;
    }
}