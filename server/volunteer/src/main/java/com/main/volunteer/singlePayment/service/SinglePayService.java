package com.main.volunteer.singlePayment.service;

import com.main.volunteer.singlePayment.dto.ApproveResponseDto;
import com.main.volunteer.singlePayment.dto.ReadyResponseDto;
import com.main.volunteer.singlePayment.entity.SinglePayment;
import com.main.volunteer.singlePayment.repository.SinglePaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Transactional
public class SinglePayService {
    @Value("${payment.cid}")
    private String cid; // 가맹점 테스트 코드

    @Value("${payment.admin_key}")
    private String admin_key;
    @Value("${payment.host}")
    private String host;

    @Value("${payment.url}")
    private String redirectUrl;
    private ReadyResponseDto kakaoPayReady;

    private final SinglePaymentRepository paymentRepository;

    public ReadyResponseDto kakaoPayReady() {
        // 카카오페이 요청 양식
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", "가맹점 주문 번호");
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("item_name", "상품명");
        parameters.add("quantity", "주문 수량");
        parameters.add("total_amount", "총 금액");
        parameters.add("vat_amount", "부가세");
        parameters.add("tax_free_amount", "상품 비과세 금액");
        parameters.add("approval_url", "http://localhost:8080/payment/success"); // 성공 시 redirect url
        parameters.add("cancel_url", "http://localhost:8080/payment/cancel"); // 취소 시 redirect url
        parameters.add("fail_url", "http://localhost:8080/payment/fail"); // 실패 시 redirect url

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        kakaoPayReady = restTemplate.postForObject(
                host+"/ready", //post 요청 url
                requestEntity,
                ReadyResponseDto.class);

        return kakaoPayReady;
    }

    // 결제 완료 승인
    public ApproveResponseDto approveResponse(String pgToken) {
        // 카카오 요청
        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", kakaoPayReady.getTid());
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("pg_token", pgToken);

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();
        ApproveResponseDto approveResponse = restTemplate.postForObject(
                host+"/approve",
                requestEntity,
                ApproveResponseDto.class);

        //결제 데이터 저장
        SinglePayment payment = new SinglePayment();
        payment.setTid(kakaoPayReady.getTid());
        paymentRepository.save(payment);
        return approveResponse;
    }


    // 카카오가 요구한 헤더값
    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();

        String auth = "KakaoAK " + admin_key;

        headers.set("Authorization", auth);
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return headers;
    }
}
