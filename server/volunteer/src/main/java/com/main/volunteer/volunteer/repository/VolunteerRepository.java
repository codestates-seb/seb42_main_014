package com.main.volunteer.volunteer.repository;

import com.main.volunteer.volunteer.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {
}
