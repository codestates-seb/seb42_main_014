package com.main.volunteer.domain.like.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LikeDto {


    @AllArgsConstructor
    @Getter
    public static class Response {
        private Long likeId;
        private Long memberId;
        private Long volunteerId;
    }
}
