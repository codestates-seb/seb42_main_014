package com.main.volunteer.domain.membergroup.controller;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.group.service.GroupService;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.domain.membergroup.dto.MemberGroupDto;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import com.main.volunteer.domain.membergroup.mapper.MemberGroupMapper;
import com.main.volunteer.domain.membergroup.service.MemberGroupService;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/member-groups")
@RequiredArgsConstructor
public class MemberGroupController {
    public static final String DEFAULT_URI = "/member-groups";
    private final MemberGroupMapper mapper;
    private final MemberGroupService memberGroupService;
    private final GroupService groupService;
    private final MemberService memberService;

    @PostMapping("/{group-id}")
    public ResponseEntity<?> createMemberGroup(@PathVariable("group-id") long groupId, @RequestBody MemberGroupDto.Post postDto, @AuthenticationPrincipal CustomUserDetails userDetails) {

        MemberGroup memberGroup = mapper.memberGroupDtoToMemberGroup(postDto);
        memberGroup.setMember(memberService.findMember(userDetails.getMemberId()));
        memberGroup.setGroup(groupService.verifyExistGroup(groupId));

        memberGroup = memberGroupService.createMemberGroup(memberGroup);

        URI uri = UriUtil.createUri(DEFAULT_URI, memberGroup.getMemberGroupId());

        return ResponseEntity.created(uri).body(ApiResponse.ok("data", mapper.memberGroupToMemberGroupResponse(memberGroup)));
    }

    @GetMapping
    public ResponseEntity<?> getMemberGroupsByMemberId(@AuthenticationPrincipal CustomUserDetails userDetails){
            List<MemberGroup> memberGroups = memberGroupService.findMemberGroupsByMemberId(userDetails.getMemberId());
            return ResponseEntity.ok().body(ApiResponse.ok("data", mapper.memberGroupsToMemberGroupsResponses(memberGroups)));
    }

    @GetMapping("/{group-id}")
    public ResponseEntity<?> getMemberGroupsByGroupId(@PathVariable("group-id") long groupId){
        List<MemberGroup> memberGroups = memberGroupService.findMemberGroupsByGroupId(groupId);
        return ResponseEntity.ok().body(ApiResponse.ok("data", mapper.memberGroupsToMemberGroupsResponses(memberGroups)));
    }

}
