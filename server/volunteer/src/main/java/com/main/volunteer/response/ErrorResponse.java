package com.main.volunteer.response;

import com.main.volunteer.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
public class ErrorResponse {
    private int status;
    private String message;

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public static ErrorResponse of(ExceptionCode exceptionCode){
        return new ErrorResponse(exceptionCode.getCode(), exceptionCode.getMessage());
    }

    public static ErrorResponse of(HttpStatus httpStatus){
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

}
