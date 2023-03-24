package com.main.volunteer.domain.group.controller;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.group.dto.GroupDto;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.group.mapper.GroupMapper;
import com.main.volunteer.domain.group.service.GroupService;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.domain.tag.entity.Tag;
import com.main.volunteer.domain.tag.service.TagService;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/groups")
@AllArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final GroupMapper mapper;
    private final TagService tagService;
    private final MemberService memberService;
    public static final String DEFAULT_URI = "/groups";


    @PostMapping
    @PreAuthorize("hasRole('ROLE_GROUPZANG')")
    public ResponseEntity<?> postGroup(@RequestBody @Valid GroupDto.Post postDto, @AuthenticationPrincipal CustomUserDetails userDetails){
        Tag tag = tagService.getTagName(postDto.getTagName());
        Group group = mapper.groupPostDtoToGroup(postDto);
        group.setGroupZangId(userDetails.getMemberId());
        group.setTag(tag);
        Group createGroup = groupService.createGroup(group);
        URI uri = UriUtil.createUri(DEFAULT_URI, group.getGroupId());

        return ResponseEntity.created(uri).body(ApiResponse.created("data", mapper.groupToGroupResponseDto(createGroup, true)));
    }


    @GetMapping("/{group-id}")
    public ResponseEntity<?> getGroup(@PathVariable("group-id") long groupId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Group group = groupService.findGroup(groupId);

        boolean groupMember = false;
        if (userDetails != null) {
            long memberId = userDetails.getMemberId();
            groupMember = group.getMemberGroups().stream()
                    .anyMatch(memberGroup -> memberGroup.getMember().getMemberId() == memberId);
        }
        return ResponseEntity.ok().body(ApiResponse.ok("data", mapper.groupToGroupResponseDto(group, groupMember)));
    }
    @GetMapping
    public ResponseEntity<?> getGroups(@RequestParam(value = "pageNum", defaultValue = "1")int pageNum) {

        Page<Group> groupPage = groupService.findGroups(pageNum - 1);
        List<Group> groupList = groupPage.getContent();

        return ResponseEntity.ok().body(ApiResponse.ok("data",mapper.GroupsToGroupResponseDtos(groupList), "totalPages", groupPage.getTotalPages()));
    }
    @PatchMapping("/{group-id}")
    @PreAuthorize("hasRole('ROLE_GROUPZANG')")
    public ResponseEntity<?> updateGroup(@PathVariable("group-id") long groupId, @Valid @RequestBody GroupDto.Patch patchDto, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Group group = groupService.updateGroup(mapper.groupPatchDtoToGroup(patchDto), memberService.verifiedMember(userDetails.getMemberId()));

        return ResponseEntity.ok().body(ApiResponse.ok("data" ,mapper.groupToGroupResponseDto(group, true)));
    }

    @DeleteMapping("/{group-id}")
    @PreAuthorize("hasRole('ROLE_GROUPZANG') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteGroup(@PathVariable("group-id") long groupId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        groupService.deleteGroup(groupId, memberService.verifiedMember(userDetails.getMemberId()));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
