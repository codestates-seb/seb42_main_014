package com.main.volunteer.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

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
        private Long volunteerId;
        private String memberName;
        private String profileImage;
        private String content;
        private LocalDateTime modifiedAt;

    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{

        @NotBlank
        private String content;
    }
}
