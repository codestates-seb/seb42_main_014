package com.main.volunteer.domain.group.service;

import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.group.repository.GroupRepository;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;
    private final MemberService memberService;

    // 그룹 생성

    public Group createGroup(Group group) {
        long groupZangId = group.getGroupZangId();
        Member member = memberService.verifiedMember(groupZangId);
        group.setMember(member);
        group.setGroupZangId(groupZangId);

        // 그룹장 포인트 15이상인지 확인
        if(!checkGroupLeaderPoint(group.getGroupZangId())) {
            throw new BusinessException(ExceptionCode.NOT_ENOUGH_POINT);
        }
        else if(member.getRoles().contains("GROUPZANG") || member.getRoles().contains("ADMIN")){
            MemberGroup memberGroup = new MemberGroup(group, member);
            member.getMemberGroups().add(memberGroup);
        }
        return groupRepository.save(group);

    }

    // 그룹 상세
    @Transactional(readOnly = true)
    public Group findGroup(long groupId) {
        return verifyExistGroup(groupId);
    }

    // 그룹 목록
//    public Page<Group> findGroups(int pageNum){
//        return groupRepository.findAll(PageRequest.of(pageNum , 5));
//    }
    public List<Group> findGroups(){
        return groupRepository.findAll();
    }
    // 그룹 수정
    public Group updateGroup(Group group, Member member) {

        Group verifyGroup = verifyExistGroupAndMember(group.getGroupId(), member);
        boolean updatable = verifyUpdatableGroup(verifyGroup, group);

        if (!updatable) {
            throw new BusinessException(ExceptionCode.FAIL_GROUP_APPLY_LIMIT);
        }


        Optional.ofNullable(group.getGroupImage())
                .ifPresent(groupImage -> verifyGroup.setGroupImage(groupImage));

        Optional.ofNullable(group.getGroupName())
                .ifPresent(groupName -> verifyGroup.setGroupName(groupName));

        Optional.ofNullable(group.getContent())
                .ifPresent(groupContent -> verifyGroup.setContent(groupContent));

        Optional.ofNullable(group.getPlace())
                .ifPresent(groupPlace -> verifyGroup.setPlace(groupPlace));

        Optional.ofNullable(group.getApplyLimit())
                .ifPresent(applyLimit -> verifyGroup.setApplyLimit(applyLimit));

        return groupRepository.save(verifyGroup);
    }

    public void deleteGroup(long groupId, Member member) {

        Group group = verifyExistGroupAndMember(groupId, member);

        groupRepository.delete(group);
    }

    private boolean verifyUpdatableGroup(Group verifyGroup, Group group) {
        int applyLimit = group.getApplyLimit();
        if (applyLimit < verifyGroup.getMemberGroups().size()) {
            throw new BusinessException(ExceptionCode.FAIL_GROUP_APPLY_LIMIT);
        }
        return applyLimit > verifyGroup.getApplyLimit();
    }

    // 그룹 존재 검증
   @Transactional(readOnly = true)
    public Group verifyExistGroup(long groupId) {
        Optional<Group> optional = groupRepository.findById(groupId);
        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.GROUP_NOT_EXIST));
    }

    @Transactional(readOnly = true)
    public Group verifyExistGroupAndMember (long groupId, Member member) {
        Optional<Group> optional = groupRepository.findByGroupIdAndMember(groupId, member);
        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.GROUP_NOT_EXIST));
    }

    public boolean checkGroupLeaderPoint(long memberId) {

        Member member = memberService.verifiedMember(memberId);
        if("admin".equals(member.getMemberName())) return true;
        else if(member.getPoint().getPointCount() >= 15){
            member.setRoles(List.of("GROUPZANG", "USER"));
            return true;
        }
        return false;
    }
}
