package com.main.volunteer.singlePayment.entity;

import javax.persistence.*;

@Entity
public class CardInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cardInfoId;
    private String approvedId;
    private String bin;
    private String cardMid;
    private String cardType;
    private String installMonth;
    private String issuerCorp;
    private String issuerCorpCode;
    private String purchaseCorp;
    private String purchaseCorpCode;
    private String cardItemCode;
    private String interestFreeInstall;
    private String kakaopayPurchaseCorp;
    private String kakaopayPurchaseCorpCode;
    private String kakaopayIssuerCorp;
    private String kakaopayIssuerCorpCode;

    @OneToOne(mappedBy = "cardInfo")
    private SinglePayment singlePayment;
}
