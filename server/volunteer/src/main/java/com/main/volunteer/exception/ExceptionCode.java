package com.main.volunteer.exception;

import lombok.Getter;
import lombok.Setter;

public enum ExceptionCode {

    // Resource
    BAD_REQUEST(400, "잘못된 요청 입니다."),
    NOT_FOUND(404, "페이지를 찾을 수 없습니다."),
    MEMBER_NOT_FOUND(404, "등록되지 않은 회원입니다."),
    CONFLICT(409, "충돌이 났습니다."),
    MEMBER_EXIST(409, "이미 등록된 회원입니다."),
    NICKNAME_EXIST(409, "이미 등록된 닉네임입니다."),

    // Security
    UNAUTHORIZED(401, "사용자가 인증되지 않았습니다."),

    // Group - 600부터
    FAIL_GROUP_APPLY_LIMIT(600, "현재 등록되어 있는 그룹의 멤버수가 수정하려는 멤버수보다 많습니다.");

    @Getter
    private int code;

    @Getter
    private String message;


    ExceptionCode(int code, String message) {
        this.code =code;
        this.message = message;
    }

}
