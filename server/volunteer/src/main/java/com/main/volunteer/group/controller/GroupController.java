package com.main.volunteer.group.controller;

import com.main.volunteer.group.dto.GroupDto;
import com.main.volunteer.group.entity.Group;
import com.main.volunteer.group.mapper.GroupMapper;
import com.main.volunteer.group.service.GroupService;
import com.main.volunteer.response.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/group")
@AllArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final GroupMapper mapper;

    public static final String DEFAULT_URI = "/group";

    @PostMapping
    public ApiResponse postGroup(@RequestBody @Valid GroupDto.Post postDto){

        Group group = groupService.createGroup(mapper.groupPostDtoToGroup(postDto));
        return ApiResponse.of(HttpStatus.CREATED, "group", group);
    }

    @GetMapping("/{group-id}")
    public ResponseEntity getGroup(@PathVariable("group-id") long groupId) {
        Group group = groupService.findGroup(groupId);
        return new ResponseEntity<>(group, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getGroups() {
        List<Group> groupList = groupService.findGroups();
        return new ResponseEntity(groupList, HttpStatus.OK);
    }
    @PatchMapping("/{group-id}")
    public ResponseEntity updateGroup(@PathVariable("group-id") long groupId, @Valid @RequestBody GroupDto.Patch patchDto) {

        Group group = groupService.updateGroup(mapper.groupPatchDtoToGroup(patchDto));
//        URI uri = UriUtil.createUri(DEFAULT_URI, group.getGroupId());
//        return ResponseEntity.created(uri).body(ApiResponse.ok("group", group));
        return new ResponseEntity<>(group, HttpStatus.OK);
    }

    @DeleteMapping("/{group-id}")
    public ResponseEntity deleteGroup(@PathVariable("group-id") long groupId) {
        groupService.deleteGroup(groupId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
