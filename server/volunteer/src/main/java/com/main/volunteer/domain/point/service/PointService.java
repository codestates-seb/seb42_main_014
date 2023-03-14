package com.main.volunteer.domain.point.service;

import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.point.entity.Point;
import com.main.volunteer.domain.point.repository.PointRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PointService {

    private final PointRepository pointRepository;

    public PointService(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    public void plusPointCount(Member member) {
        Point point = member.getPoint();
        log.info("point : " + point.getPointId());
        log.info("point Count : " + point.getPointCount());
        point.setPointCount(point.getPointCount() +3);
        pointRepository.save(point);
        log.info("point Count : " + point.getPointCount());
    }

    public void minusPointCount(Member member) {
        Point point = member.getPoint();
        point.setPointCount(point.getPointCount() -3);
        pointRepository.save(point);
    }
}
