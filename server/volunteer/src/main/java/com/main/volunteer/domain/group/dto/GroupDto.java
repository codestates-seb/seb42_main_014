package com.main.volunteer.domain.group.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import lombok.Setter;

import javax.validation.constraints.*;
@Setter
@Getter
@AllArgsConstructor
public class GroupDto {
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "그룹이름을 입력해주세요.")
        private String groupName;
        private String groupImage;
        @NotNull(message = "인원을 입력해주세요.")
        private int applyLimit;
        private String place;
        @NotBlank(message = "소개글을 입력해주세요.")
        private String content;
        private String tagName;
    }
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long groupId;
        private String groupName;
        private String groupImage;
        private int applyLimit;
        private String place;
        private String content;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private long groupId;
        private String groupName;
        private String groupImage;
        private long groupZangId;
        private int applyLimit;
        private String place;
        private String content;
        private long tagId;
        private String tagName;
        private boolean groupMember;
    }
}
