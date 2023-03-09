package com.main.volunteer.singlePayment.dto.kakao;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/* 결제 요청 */
@Getter
@Setter
@ToString
public class ReadyResponseDto {
    private String tid; // 결제 고유 번호
    private String next_redirect_pc_url; // 결제 페이지 url 받기 pc
    private String next_redirect_mobile_url; // 결제 페이지 url 받기 mobile
    private String created_at;
//    private String partner_order_id;
//    private String partner_user_id;
//    private String quantity;
}
