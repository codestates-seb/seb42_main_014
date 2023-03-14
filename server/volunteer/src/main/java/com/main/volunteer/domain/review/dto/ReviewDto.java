package com.main.volunteer.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class ReviewDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{

        @NotBlank
        private String content;

    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private Long reviewId;
        private String content;
        private Long memberId;
        private Long volunteerId;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{

        private String content;
    }
}
