package com.main.volunteer.singlePayment.service;

import com.main.volunteer.singlePayment.dto.ApproveRequestDto;
import com.main.volunteer.singlePayment.dto.ApproveResponseDto;
import com.main.volunteer.singlePayment.dto.PaymentRequestDto;
import com.main.volunteer.singlePayment.dto.ReadyResponseDto;
import com.main.volunteer.singlePayment.mapper.SinglePaymentMapper;
import com.main.volunteer.singlePayment.repository.SinglePaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional
@RequiredArgsConstructor
public class SinglePaymentService {
    @Value("${payment.cid}")
    private String cid; // 가맹점 테스트 코드

    @Value("${payment.admin_key}")
    private String admin_key;
    @Value("${payment.host}")
    private String host;

    private ReadyResponseDto kakaoPayReady;
    private SinglePaymentMapper mapper;
    private final SinglePaymentRepository singlePaymentRepository;

    public ReadyResponseDto kakaoPayReady(PaymentRequestDto paymentRequestDto) {
        // 카카오페이 요청 양식
        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", paymentRequestDto.getOrderId());
        parameters.add("partner_user_id", paymentRequestDto.getMemberId());
        parameters.add("item_name", paymentRequestDto.getProductName());
        parameters.add("quantity", paymentRequestDto.getQuantity());
        parameters.add("total_amount", paymentRequestDto.getTotal());
        parameters.add("tax_free_amount", 0);
        parameters.add("approval_url", "http://125.176.52.40:8080"); // 성공 시 redirect url
        parameters.add("cancel_url", "http://125.176.52.40:8080"); // 취소 시 redirect url
        parameters.add("fail_url", "http://125.176.52.40:8080"); // 실패 시 redirect url

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        kakaoPayReady = restTemplate.postForObject(
                host+"/ready", //post 요청 url
                requestEntity,
                ReadyResponseDto.class);

        return kakaoPayReady;
    }

    // 결제 완료 승인
    public ApproveResponseDto approveResponse(ApproveRequestDto approveRequestDto) {
        // 카카오 요청
        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", kakaoPayReady.getTid());
        parameters.add("partner_user_id", "가맹점 회원 ID");
        parameters.add("pg_token", approveRequestDto.getPg_token());

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();
        ApproveResponseDto approveResponseDto = restTemplate.postForObject(
                host+"/approve",
                requestEntity,
                ApproveResponseDto.class);

        //결제 데이터 저장
        singlePaymentRepository.save(mapper.approveResponseDtoToSinglePayment(approveResponseDto));
        return approveResponseDto;

    }


    // 카카오가 요구한 헤더값
    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();

        String auth = "KakaoAK " + admin_key;

        headers.set("Authorization", auth);

        return headers;
    }
}
