package com.main.volunteer.group.mapper;

import com.main.volunteer.group.dto.GroupDto;
import com.main.volunteer.group.entity.Group;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GroupMapper {

    Group groupPostDtoToGroup(GroupDto.Post postDto);
    Group groupPatchDtoToGroup(GroupDto.Patch patchDto);
}
