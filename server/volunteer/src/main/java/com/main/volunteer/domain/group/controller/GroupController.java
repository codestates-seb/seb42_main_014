package com.main.volunteer.domain.group.controller;

import com.main.volunteer.domain.group.dto.GroupDto;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.group.mapper.GroupMapper;
import com.main.volunteer.domain.group.service.GroupService;
import com.main.volunteer.domain.tag.entity.Tag;
import com.main.volunteer.domain.tag.service.TagService;
import com.main.volunteer.util.UriUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public static final String DEFAULT_URI = "/groups";


    @PostMapping
    public ResponseEntity<?> postGroup(@RequestBody @Valid GroupDto.Post postDto){
        Tag tag = tagService.getTag(postDto.getTagName());
        Group group = mapper.groupPostDtoToGroup(postDto);
        group.setTag(tag);
        Group createGroup = groupService.createGroup(group);
        GroupDto.Response response = mapper.GroupToGroupResponseDto(createGroup);
        URI uri = UriUtil.createUri(DEFAULT_URI, group.getGroupId());

        return ResponseEntity.created(uri).body(response);
    }


    @GetMapping("/{group-id}")
    public ResponseEntity<?> getGroup(@PathVariable("group-id") long groupId) {

        Group group = groupService.findGroup(groupId);
        GroupDto.Response response = mapper.GroupToGroupResponseDto(group);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }
    @GetMapping
    public ResponseEntity<?> getGroups() {

        List<Group> groupList = groupService.findGroups();

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(mapper.GroupToGroupResponseDtos(groupList));
    }
    @PatchMapping("/{group-id}")
    public ResponseEntity<?> updateGroup(@PathVariable("group-id") long groupId, @Valid @RequestBody GroupDto.Patch patchDto) {

        Group group = groupService.updateGroup(mapper.groupPatchDtoToGroup(patchDto));

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(group);
    }

    @DeleteMapping("/{group-id}")
    public ResponseEntity<?> deleteGroup(@PathVariable("group-id") long groupId) {

        groupService.deleteGroup(groupId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
