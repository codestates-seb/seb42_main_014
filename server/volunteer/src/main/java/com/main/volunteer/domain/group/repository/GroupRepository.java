package com.main.volunteer.domain.group.repository;

import com.main.volunteer.domain.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
}
