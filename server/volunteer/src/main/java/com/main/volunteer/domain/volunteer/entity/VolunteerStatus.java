package com.main.volunteer.domain.volunteer.entity;

import lombok.Getter;

public enum VolunteerStatus {
    VOLUNTEER_APPLY_BEFORE( "신청 기간 전"),
    VOLUNTEER_APPLYING("모집 중"),
    VOLUNTEER_APPLY_LIMIT_OVER("인원 모집 마감"), //모집 기간 중 인원이 다 찼을 경우
    VOLUNTEER_APPLY_AFTER("모집 종료"), //봉사 일시 24시간전 ~ 봉사 날짜
    VOLUNTEER_AFTER("봉사 활동 완료"); //봉사 일시

    @Getter
    private final String stepDescription;

    VolunteerStatus(String stepDescription) {
        this.stepDescription = stepDescription;
    }

}
