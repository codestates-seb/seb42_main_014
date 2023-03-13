package com.main.volunteer.domain.volunteer.mapper;


import com.main.volunteer.domain.volunteer.dto.VolunteerDto;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VolunteerMapper{

    Volunteer postDtoToVolunteer(VolunteerDto.Post post);

    Volunteer patchDtoToVolunteer(VolunteerDto.Patch patchDto);

    VolunteerDto.Response volunteerToResponseDto(Volunteer volunteer);
}
