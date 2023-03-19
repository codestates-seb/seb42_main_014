package com.main.volunteer.domain.volunteer.repository.custom;

import com.main.volunteer.domain.volunteer.entity.Condition;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import org.springframework.data.domain.Page;


public interface VolunteerRepositoryCustom {

    Page<Volunteer> findBySearchOption(Condition condition);

}
