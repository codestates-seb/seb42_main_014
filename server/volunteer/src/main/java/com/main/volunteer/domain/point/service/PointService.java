package com.main.volunteer.domain.point.service;

import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.point.entity.Point;
import com.main.volunteer.domain.point.repository.PointRepository;
import org.springframework.stereotype.Service;

@Service
public class PointService {

    private final PointRepository pointRepository;

    public PointService(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    public void plusPointCount(Member member) {
        Point point = member.getPoint();
        point.setPointCount(point.getPointCount() +3);
        pointRepository.save(point);
    }

    public void minusPointCount(Member member) {
        Point point = member.getPoint();
        point.setPointCount(point.getPointCount() -3);
        pointRepository.save(point);
    }
}
