package com.main.volunteer.singlePayment.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ApproveRequestDto {
    private String cid;
    private String tid;
    private String partner_order_id;
    private String partner_user_id;
    private String pg_token;
}
