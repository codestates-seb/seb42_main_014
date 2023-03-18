package com.main.volunteer.domain.volunteer.repository.custom;

import com.main.volunteer.domain.tag.entity.Tag;
import com.main.volunteer.domain.volunteer.entity.Volunteer;

import java.util.List;

public interface VolunteerRepositoryCustom {
    List<Volunteer> findBySearchOption(String volunteerName, String organizationName, Long tagId, String province, String city);

}
