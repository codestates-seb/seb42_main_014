package com.main.volunteer.domain.volunteer.repository.custom;

import com.main.volunteer.domain.volunteer.entity.Condition;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface VolunteerRepositoryCustom {

    Page<Volunteer> findBySearchOption(Condition condition);

}
