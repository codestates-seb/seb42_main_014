package com.main.volunteer.volunteer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Getter
public class VolunteerDto {

    @AllArgsConstructor
    @Getter
    public static class Post{

        @NotBlank
        private String title;

        @NotBlank
        private String content;

    }
}
