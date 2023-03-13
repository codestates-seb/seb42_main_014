package com.main.volunteer.group.service;

import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import com.main.volunteer.group.entity.Group;
import com.main.volunteer.group.repository.GroupRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GroupService {
    private final GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    // 그룹 생성
    public Group createGroup(Group group) {
        return groupRepository.save(group);
    }

    // 그룹 상세
    @Transactional(readOnly = true)
    public Group findGroup(long groupId) {
        return verifyExistGroup(groupId);
    }

    // 그룹 목록
    public List<Group> findGroups(){
        return groupRepository.findAll();
    }

    // 그룹 수정
    public Group updateGroup(Group group) {

        Group verifyGroup = verifyExistGroup(group.getGroupId());

        //수정 시 현재 인원 보다 적은지 검증
        if(!verifyUpdatableGroup(verifyGroup, group)){
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

        return groupRepository.save(group);
    }

    public void deleteGroup(long groupId) {

        Group group = verifyExistGroup(groupId);
        groupRepository.delete(group);
    }
    private boolean verifyUpdatableGroup(Group verifyGroup, Group group) {
        //1. applyLimit 변경 시 현재 등록된 멤버 수 확인
        if(verifyGroup.getMemberGroups().size() > group.getApplyLimit()){
            return false;
        }
        return true;
    }

    // 그룹 존재 검증
    @Transactional(readOnly = true)
    private Group verifyExistGroup(Long groupId) {
        Optional<Group> optional = groupRepository.findById(groupId);
        return optional.orElseThrow(() -> new RuntimeException("존재하는 그룹이 없습니다."));
    }
}
