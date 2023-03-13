package com.main.volunteer.group.controller;

import com.main.volunteer.group.dto.GroupDto;
import com.main.volunteer.group.entity.Group;
import com.main.volunteer.group.mapper.GroupMapper;
import com.main.volunteer.group.service.GroupService;
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
    public static final String DEFAULT_URI = "/groups";


    @PostMapping
    public ResponseEntity<?> postGroup(@RequestBody @Valid GroupDto.Post postDto){

        Group group = groupService.createGroup(mapper.groupPostDtoToGroup(postDto));
        Group createCroup = groupService.createGroup(group);
        URI uri = UriUtil.createUri(DEFAULT_URI, createCroup.getGroupId());

        return ResponseEntity.created(uri).body(group);
    }


    @GetMapping("/{group-id}")
    public ResponseEntity<?> getGroup(@PathVariable("group-id") long groupId) {

        Group group = groupService.findGroup(groupId);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(group);
    }
    @GetMapping
    public ResponseEntity<?> getGroups() {

        List<Group> groupList = groupService.findGroups();

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(groupList);
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
