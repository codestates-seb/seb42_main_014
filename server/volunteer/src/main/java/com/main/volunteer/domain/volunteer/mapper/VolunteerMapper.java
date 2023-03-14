package com.main.volunteer.domain.volunteer.mapper;


import com.main.volunteer.domain.volunteer.dto.VolunteerDto;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VolunteerMapper{

    Volunteer postDtoToVolunteer(VolunteerDto.Post post);

    Volunteer patchDtoToVolunteer(VolunteerDto.Patch patchDto);

    VolunteerDto.Response volunteerToResponseDto(Volunteer volunteer);
}
