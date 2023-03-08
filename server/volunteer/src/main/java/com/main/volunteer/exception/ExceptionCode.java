package com.main.volunteer.exception;

import lombok.Getter;

public enum ExceptionCode {
    // Payment ExceptionCode

    //400 BAD REQUEST - 잘못된 요청
    //401 UNAUTHORIZED : 인증되지 않은 사용자
    //404 NOT_FOUND : Resource 를 찾을 수 없음.
    //409 CONFLICT : Resource 의 현재 상태와 충돌.
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
