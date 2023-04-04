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

        if(verifyExistMemberGroup(memberGroup.getMemberId(), memberGroup.getGroupId())){
            throw new BusinessException(ExceptionCode.MEMBER_GROUP_EXIST);
        }
        Member member = memberService.verifiedMember(memberGroup.getMemberId());
        Group group = groupService.verifyExistGroup(memberGroup.getGroupId());

        memberGroup.setMember(member);
        memberGroup.setGroup(group);

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

    public List<MemberGroup> findMemberGroupListByMemberId(long memberId) {

        Member member = memberService.verifiedMember(memberId);
        List<MemberGroup> memberGroups = memberGroupRepository.findByMember(member);
        return memberGroups;
    }

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
