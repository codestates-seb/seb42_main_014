package com.main.volunteer.domain.apply.dto;

import com.main.volunteer.domain.apply.entity.ApplyStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
public class ApplyDto {

    @AllArgsConstructor
    @Getter
    public static class Response{
        private Long applyId;
        private ApplyStatus applyStatus;
        private int memberId;
        private Long volunteerId;
    }


}
