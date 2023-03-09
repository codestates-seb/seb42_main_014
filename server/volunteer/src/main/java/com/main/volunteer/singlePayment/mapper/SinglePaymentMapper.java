package com.main.volunteer.singlePayment.mapper;

import com.main.volunteer.singlePayment.dto.kakao.ApproveResponseDto;
import com.main.volunteer.singlePayment.entity.SinglePayment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SinglePaymentMapper {
    SinglePayment approveResponseDtoToSinglePayment(ApproveResponseDto approveResponseDto);
}
