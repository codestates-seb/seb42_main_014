package com.main.volunteer.singlePayment.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ApproveRequestDto {
    private String tid;
    private String orderId;
    private String memberId;
    private String pgToken;
}
