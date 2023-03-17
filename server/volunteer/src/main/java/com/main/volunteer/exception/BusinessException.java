package com.main.volunteer.exception;

import com.main.volunteer.response.ErrorResponse;
import lombok.Getter;
@Getter
public class BusinessException extends RuntimeException{

    private ExceptionCode exceptionCode;
    private final ErrorResponse errorResponse;

    public BusinessException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
        this.errorResponse = ErrorResponse.of(exceptionCode);
    }

    public BusinessException(String message, ErrorResponse errorResponse) {
        super(message);
        this.errorResponse = errorResponse;
    }
}
