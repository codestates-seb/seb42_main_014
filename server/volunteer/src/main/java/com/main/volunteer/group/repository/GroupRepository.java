package com.main.volunteer.group.repository;

import com.main.volunteer.group.entity.Group;
import com.main.volunteer.volunteer.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
}
