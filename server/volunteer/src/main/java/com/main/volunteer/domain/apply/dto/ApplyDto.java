package com.main.volunteer.domain.apply.dto;

import com.main.volunteer.domain.apply.entity.ApplyStatus;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import lombok.AllArgsConstructor;
import lombok.Getter;



@AllArgsConstructor
@Getter
public class ApplyDto {

    @AllArgsConstructor
    @Getter
    public static class ResponseToORG{
        private Long applyId;
        private Long volunteerId;
        private ApplyStatus applyStatus;
        private Long memberId;
        private String memberEmail;
        private String memberName;

    }

    @AllArgsConstructor
    @Getter
    public static class Response{
        private Long applyId;
        private Long volunteerId;
        private ApplyStatus applyStatus;
        private Boolean reviewDone;
    }


}
