package com.main.volunteer.singlePayment.entity;

import javax.persistence.*;

@Entity
public class Amount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long amountId;
    private int total; // 총 결제 금액
    private int taxFree; // 비과세 금액
    private int tax; // 부가세 금액

    @OneToOne(mappedBy = "amount")
    private SinglePayment singlePayment;
}
