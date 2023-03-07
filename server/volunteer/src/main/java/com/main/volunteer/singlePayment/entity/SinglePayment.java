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
    private String tid; // 결제 고유 번호

}
