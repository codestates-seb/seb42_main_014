package com.main.volunteer.volunteer.mapper;


import com.main.volunteer.volunteer.dto.VolunteerDto;
import com.main.volunteer.volunteer.entity.Volunteer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VolunteerMapper{

    Volunteer postDtoToVolunteer(VolunteerDto.Post post);

}
