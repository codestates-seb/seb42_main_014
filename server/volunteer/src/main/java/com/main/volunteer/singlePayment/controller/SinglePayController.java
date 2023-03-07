package com.main.volunteer.singlePayment.controller;

import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import com.main.volunteer.singlePayment.dto.ApproveResponseDto;
import com.main.volunteer.singlePayment.dto.ReadyResponseDto;
import com.main.volunteer.singlePayment.service.SinglePayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class SinglePayController {
    private final SinglePayService singlePayService;

    //결제 요청
    @PostMapping("/ready")
    public ReadyResponseDto paymentRequest() {
        return singlePayService.kakaoPayReady();
    }

    // 결제 성공
    @GetMapping("/success")
    public ResponseEntity afterPaymentRequest(String pgToken) {

        ApproveResponseDto approve = singlePayService.approveResponse(pgToken);

        return new ResponseEntity<>(approve, HttpStatus.OK);
    }

    // 결제 진행 중 취소
    @GetMapping("/cancel")
    public void cancelPaymentRequest() {

        throw new BusinessException(ExceptionCode.PAY_CANCEL);
    }

    // 결제 실패
    @GetMapping("/fail")
    public void failPaymentRequest() {

        throw new BusinessException(ExceptionCode.PAY_FAILED);
    }
}
