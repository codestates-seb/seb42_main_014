package com.main.volunteer.exception;

import lombok.Getter;

public enum ExceptionCode {
    // Payment ExceptionCode
    PAY_CANCEL(404,"결제가 취소되었습니다"),
    PAY_FAILED(404,"결제가 실패하였습니다");

    @Getter
    private int code;

    @Getter
    private String message;


    ExceptionCode(int code, String message) {
        this.code =code;
        this.message = message;
    }

}
