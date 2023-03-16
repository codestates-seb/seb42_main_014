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
    FAIL_GROUP_APPLY_LIMIT(600, "현재 등록되어 있는 그룹의 멤버수가 수정하려는 멤버수보다 많습니다."),
    GROUP_EXIST(601, "이미 생성된 그룹입니다."),
    NOT_GROUP_ZANG(602, "그룹장만 그룹을 생성할 수 있습니다."),

    // memberGroup은 650 번대부터
    MEMBER_GROUP_EXIST(650, "이미 그룹에 가입되어 있습니다."),
    MEMBER_GROUP_NOT_EXIST(651, "가입되어있는 그룹이 없습니다."),

    // Comment -700 부터
    COMMENT_EXIST(700, "이미 존재하는 댓글입니다.");

    @Getter
    private int code;

    @Getter
    private String message;


    ExceptionCode(int code, String message) {
        this.code =code;
        this.message = message;
    }

}
