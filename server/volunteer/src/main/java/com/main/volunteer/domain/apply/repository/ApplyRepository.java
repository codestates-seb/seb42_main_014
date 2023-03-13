package com.main.volunteer.domain.apply.repository;

import com.main.volunteer.domain.apply.entity.Apply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplyRepository extends JpaRepository<Apply, Long> {


}
