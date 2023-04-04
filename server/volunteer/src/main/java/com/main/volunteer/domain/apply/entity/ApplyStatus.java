package com.main.volunteer.domain.apply.entity;

import lombok.Getter;

public enum ApplyStatus {

    APPLY_COMPLETE("신청 완료"),
    APPLY_CANCEL("신청 취소");

    @Getter
    private final String stepDescription;

    ApplyStatus(String stepDescription) {
        this.stepDescription = stepDescription;
    }

}
