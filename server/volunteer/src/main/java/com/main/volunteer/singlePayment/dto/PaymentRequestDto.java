package com.main.volunteer.singlePayment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequestDto {
    private long orderId; //partner_orderId
    private long memberId; //partner_userId
    private String productName; //초코파이
    private int quantity; //1
    private int total; //2200
}
