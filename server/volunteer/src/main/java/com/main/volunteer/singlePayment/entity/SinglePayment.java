package com.main.volunteer.singlePayment.entity;


import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@NoArgsConstructor
public class SinglePayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long singlePaymentId;
    private String aid; // 요청 고유 번호
    private String tid; // 결제 고유 번호
    private String cid; // 가맹점 코드
    private String sid; // 정기결제용 ID
    private String partnerOrderId; // 가맹점 주문 번호
    private String partnerUserId; // 가맹점 회원 id
    private String paymentMethodType; // 결제 수단
    @OneToOne
    @JoinColumn(name = "amount_id")
    private Amount amount;
    @OneToOne
    @JoinColumn(name = "card_info_id")
    private CardInfo cardInfo;
    private String productName; // 상품명
    private String productCode; // 상품 코드
    private int quantity; // 상품 수량
    private String createdAt; // 결제 요청 시간
    private String approvedAt; // 결제 승인 시간
    private String payload; // 결제 승인 요청에 대해 저장 값, 요청 시 전달 내용

}
