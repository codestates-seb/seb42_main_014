package com.main.volunteer.domain.like.dto;

import com.main.volunteer.domain.volunteer.entity.Volunteer;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LikeDto {

    @AllArgsConstructor
    @Getter
    public static class Response {
        private Long likeId;
        private String volunteerName;
        private String organizationName;
    }
}
