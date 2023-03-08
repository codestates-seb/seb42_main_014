package com.main.volunteer.singlePayment.controller;

import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import com.main.volunteer.singlePayment.dto.ApproveRequestDto;
import com.main.volunteer.singlePayment.dto.ApproveResponseDto;
import com.main.volunteer.singlePayment.dto.PaymentRequestDto;
import com.main.volunteer.singlePayment.service.SinglePaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class SinglePayController {
    private final SinglePaymentService singlePaymentService;

    //결제 요청
    @PostMapping("/ready")
    public String paymentRequest(@RequestBody PaymentRequestDto paymentRequestDto) {

         return "redirect:" + singlePaymentService.kakaoPayReady(paymentRequestDto).getNext_redirect_pc_url(); // "redirect: https://online-pay.kakao.com/mockup/v1/80db866d0c2bbeb45c69d1f5603feb3be67e492edfefc0018bd2991c9237d68a/info";
    }

    // 결제 성공
    @GetMapping("/success")
    public ResponseEntity afterPaymentRequest(@RequestBody ApproveRequestDto approveRequestDto) {

        ApproveResponseDto approve = singlePaymentService.approveResponse(approveRequestDto);

        return new ResponseEntity<>(null, HttpStatus.OK);
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
