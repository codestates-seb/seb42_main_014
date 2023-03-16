package com.main.volunteer.domain.membergroup.controller;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import com.main.volunteer.domain.membergroup.mapper.MemberGroupMapper;
import com.main.volunteer.domain.membergroup.service.MemberGroupService;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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


    @PostMapping("/{group-id}")
    public ResponseEntity<?> createMemberGroup(@PathVariable("group-id") long groupId, long memberId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        MemberGroup join = new MemberGroup();
        join.setMember(userDetails);
        MemberGroup memberGroup = memberGroupService.createMemberGroup(groupId, memberId);

        URI uri = UriUtil.createUri(DEFAULT_URI, memberGroup.getMemberGroupId());
        return ResponseEntity.created(uri).body(ApiResponse.ok("data", mapper.memberGroupToMemberGroupResponse(memberGroup)));
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<?> getMemberGroups(@PathVariable("member-id") long memberId, @AuthenticationPrincipal CustomUserDetails userDetails){

        if (userDetails.getMemberId() == memberId) {
            List<MemberGroup> memberGroups = memberGroupService.findMemberGroupsByMemberId(memberId);

            return ResponseEntity.ok().body(ApiResponse.ok("data", mapper.memberGroupsToMemberGroupsResponses(memberGroups)));
        }else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
