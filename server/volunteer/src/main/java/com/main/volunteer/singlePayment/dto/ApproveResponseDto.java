package com.main.volunteer.singlePayment.dto;

/* 결제 승인 요청 */

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApproveResponseDto {
    private String aid; // 요청 고유 번호
    private String tid; // 결제 고유 번호
    private String cid; // 가맹점 코드
    private String sid; // 정기결제용 ID
    private String partner_order_id; // 가맹점 주문 번호
    private String partner_user_id; // 가맹점 회원 id
    private String payment_method_type; // 결제 수단

    private Amount amount;
    private static class Amount{
        private int total; // 총 결제 금액
        private int tax_free; // 비과세 금액
        private int tax; // 부가세 금액
    }
    private CardInfo card_info;
    private static class CardInfo{
        private String approved_id;
        private String bin;
        private String card_mid;
        private String card_type;
        private String install_month;
        private String issuer_corp;
        private String issuer_corp_code;
        private String purchase_corp;
        private String purchase_corp_code;
        private String card_item_code;
        private String interest_free_install;
        private String kakaopay_purchase_corp;
        private String kakaopay_purchase_corp_code;
        private String kakaopay_issuer_corp;
        private String kakaopay_issuer_corp_code;

    }
    private String item_name; // 상품명
    private String item_code; // 상품 코드
    private int quantity; // 상품 수량
    private String created_at; // 결제 요청 시간
    private String approved_at; // 결제 승인 시간
    private String payload; // 결제 승인 요청에 대해 저장 값, 요청 시 전달 내용
}
