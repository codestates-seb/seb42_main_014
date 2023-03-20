package com.main.volunteer.domain.volunteer.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.main.volunteer.domain.review.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Getter
public class VolunteerDto {

    @AllArgsConstructor
    @Getter
    public static class Post{

        @NotBlank(message = "title cannot be empty.")
        private String title;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime applyDate;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime volunteerDate;

        @NotNull(message = "volunteerTime cannot be empty.")
        private Integer volunteerTime;

        @NotBlank(message = "place cannot be empty.")
        private String place;

        @NotBlank(message = "content cannot be empty.")
        private String content;

        @NotNull(message = "applyLimit cannot be empty.")
        private Integer applyLimit;

        @NotBlank
        private String tagName;

        private String volunteerImage;

    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long volunteerId;

        private String title;

        private String volunteerImage;

        private LocalDateTime applyDate;

        private LocalDateTime volunteerDate;

        private Integer volunteerTime;

        private String place;

        private String content;

        private Integer applyLimit;

        private Integer applyCount;

        private Integer likeCount;

        private Long organizationId;

        private String tagName;

        private String volunteerStatus;

        private List<Review> reviewList;
    }


}
