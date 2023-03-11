package com.main.volunteer.volunteer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class VolunteerDto {

    @AllArgsConstructor
    @Getter
    public static class Post{

        @NotBlank(message = "title cannot be empty.")
        private String title;

        @NotBlank(message = "applyDate cannot be empty.")
        private LocalDateTime applyDate;

        @NotBlank(message = "volunteerDate cannot be empty.")
        private LocalDateTime volunteerDate;

        @NotBlank(message = "place cannot be empty.")
        private String place;

        @NotBlank(message = "content cannot be empty.")
        private String content;

        @NotBlank(message = "applyLimit cannot be empty.")
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
}
