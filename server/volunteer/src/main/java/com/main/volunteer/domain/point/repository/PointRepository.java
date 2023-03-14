package com.main.volunteer.domain.point.repository;

import com.main.volunteer.domain.point.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point, Long> {
}
