package com.main.volunteer.exception;

import lombok.Getter;

public enum ExceptionCode {
    // Resource
    BAD_REQUEST(400, "잘못된 요청 입니다."),
    NOT_FOUND(404, "페이지를 찾을 수 없습니다."),
    CONFLICT(409, "충돌이 났습니다."),
    // Security
    UNAUTHORIZED(401, "사용자가 인증되지 않았습니다."),

    // Payment ExceptionCode
    PAY_CANCEL(404,"결제가 취소되었습니다."),
    PAY_FAILED(404,"결제가 실패하였습니다.");

    @Getter
    private int code;

    @Getter
    private String message;


    ExceptionCode(int code, String message) {
        this.code =code;
        this.message = message;
    }

}
