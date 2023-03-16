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

    public MemberGroup createMemberGroup(long groupId, long memberId) {

        if(verifyExistMemberGroup(groupId, memberId)){
            throw new BusinessException(ExceptionCode.MEMBER_GROUP_EXIST);
        }

        Group group = groupService.verifyExistGroup(groupId);
        Member member = memberService.verifiedMember(memberId);

        MemberGroup memberGroup = new MemberGroup();
        memberGroup.setGroup(group);
        memberGroup.setMember(member);

        return memberGroupRepository.save(memberGroup);
    }

    public List<MemberGroup> findMemberGroupsByMemberId(long memberId) {
        List<MemberGroup> memberGroups = memberGroupRepository.findByMemberMemberId(memberId);
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
}
