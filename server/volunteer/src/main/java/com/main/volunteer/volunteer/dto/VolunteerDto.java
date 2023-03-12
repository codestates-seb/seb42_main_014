package com.main.volunteer.volunteer.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.main.volunteer.volunteer.entity.VolunteerStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class VolunteerDto {

    @AllArgsConstructor
    @Getter
    public static class Post{

        @NotBlank(message = "title cannot be empty.")
        private String title;

//        @NotNull(message = "applyDate cannot be empty.")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime applyDate;

//        @NotNull(message = "volunteerDate cannot be empty.")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime volunteerDate;

        @NotBlank(message = "place cannot be empty.")
        private String place;

        @NotBlank(message = "content cannot be empty.")
        private String content;

        @NotNull(message = "applyLimit cannot be empty.")
        private Integer applyLimit;

    }

    @AllArgsConstructor
    @Getter
    public static class Patch {
        private String title;

        private String content;

        private Integer applyLimit;

        private String place;

        private LocalDateTime volunteerDate;

        private LocalDateTime endDate;
    }

    public static class Response {
        private Long volunteerId;

        private String title;

        private LocalDateTime applyDate;

        private LocalDateTime volunteerDate;

        private String place;

        private String content;

        private Integer applyLimit;

        private Integer likeCount;

    /*
    봉사를 등록한 organization 의 memberId
     */
//    @ManyToOne
//    @JoinColumn(name = "ORGANIZATION_ID")
//    private Member member;

        @Enumerated(EnumType.STRING)
        private VolunteerStatus volunteerStatus;
    }
}
