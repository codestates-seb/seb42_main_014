package com.main.volunteer.singlePayment.dto;

import lombok.Getter;
import lombok.Setter;

/* 결제 요청 */
@Getter
@Setter
public class ReadyResponseDto {
    private String tid; // 결제 고유 번호
    private String next_redirect_pc_url; // 결제 페이지 url 받기
    private String created_at;
}
