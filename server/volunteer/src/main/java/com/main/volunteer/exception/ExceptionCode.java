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

    TOKEN_EXPIRED(409,"만료된 토큰입니다."),

    // Security
    UNAUTHORIZED(401, "사용자가 인증되지 않았습니다."),

    // Group - 600부터
    FAIL_GROUP_APPLY_LIMIT(600, "현재 등록되어 있는 그룹의 멤버수가 수정하려는 멤버수보다 많습니다."),
    GROUP_NOT_EXIST(601, "그룹이 존재 하지 않습니다."),
    NOT_GROUP_ZANG(602, "그룹장만 그룹을 생성할 수 있습니다."),

    // memberGroup은 650 번대부터
    MEMBER_GROUP_EXIST(650, "이미 그룹에 가입되어 있습니다."),
    MEMBER_GROUP_NOT_EXIST(651, "가입되어있는 그룹이 없습니다."),

    // Comment -700 부터
    COMMENT_NOT_EXIST(700, "댓글이 존재하지 않습니다."),
    NOT_GROUP_MEMBER(701, "가입된 그룹이 아닙니다."),
    MEMBER_NOT_SET(702, "멤버가 생성되지 않았습니다."),
    GROUP_NOT_SET(703, "그룹이 생성 되지 않았습니다."),
    BOTH_NOT_SET(704,"그룹, 멤버 둘다 생성 되지 않았습니다"),

    // Volunteer - 800 부터
    VOLUNTEER_NOT_EXIST(800, "등록한 봉사 활동이 없습니다."),
    ORGANIZATION_HAVE_NO_OWNERSHIP(801, "등록한 봉사 활동의 기관이 아닙니다."),
    VOLUNTEER_DATE_BEFORE_NOW(802, "봉사 날짜가 현재 날짜보다 이전입니다."),
    VOLUNTEER_DATE_BEFORE_APPLY_DATE(803, "봉사 날짜가 신청 시작 날짜보다 이전입니다."),
    APPLY_DATE_AFTER_VOLUNTEER_DATE_2_DAYS_BEFORE(804,"봉사 날짜 48시간 전까지 봉사 등록이 가능합니다."),
    NOW_AFTER_VOLUNTEER_DATE(805, "봉사 날짜 이후에는 삭제할 수 없습니다."),
    VOLUNTEER_STATUS_AFTER(806, "완료된 봉사입니다."),
    VOLUNTEER_STATUS_APPLY_AFTER(807, "모집이 완료된 봉사입니다."),
    VOLUNTEER_STATUS_APPLY_BEFORE(808, "신청 기간 전인 봉사활동입니다."),
    VOLUNTEER_APPLY_LIMIT_OVER(809, "인원이 마감 된 봉사입니다."),



    //REVIEW - 850부터

    //APPLY - 900부터
    APPLY_NOT_EXIST(900, "봉사 한 활동 내역이 없습니다."),
    APPLY_ALREADY_CANCELED(901, "이미 취소된 봉사입니다."),
    NOW_AFTER_VOLUNTEER_DATE_1_DAYS_BEFORE(902, "봉사 날짜 24시간 전에는 취소할 수 없습니다."),
    APPLY_ALREADY_COMPLETED(903, "이미 신처잉 완료된 봉사활동입니다."),



    //TAG - 1000 부터
    TAG_NOT_EXIST(1000,"존재하는 태그가 없습니다.");


    @Getter
    private final int code;

    @Getter
    private final String message;


    ExceptionCode(int code, String message) {
        this.code =code;
        this.message = message;
    }
}
