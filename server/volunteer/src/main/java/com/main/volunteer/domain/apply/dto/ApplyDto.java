package com.main.volunteer.domain.apply.dto;

import com.main.volunteer.domain.apply.entity.ApplyStatus;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.volunteer.dto.VolunteerDto;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;


@AllArgsConstructor
@Getter
public class ApplyDto {

    @AllArgsConstructor
    @Getter
    public static class ResponseToORG{
        private Long applyId;
        private String volunteerName;
        private ApplyStatus applyStatus;
        private Long memberId;
        private String profileImage;
        private String memberEmail;
        private String memberName;

    }

    @AllArgsConstructor
    @Getter
    public static class Response{
        private Long applyId;
        private String volunteerName;
        private LocalDateTime volunteerDate;
        private LocalDateTime appliedAt;
        private ApplyStatus applyStatus;
        private Boolean reviewDone;
    }


}
