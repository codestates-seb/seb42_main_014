package com.main.volunteer.group.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
@AllArgsConstructor
public class GroupDto {
    @Setter
    @Getter
    public static class Post{
        @NotBlank(message = "그룹이름을 입력해주세요.")
        private String groupName;
        private String groupImage;
        private long groupZang;
        private int applyLimit;
        private String place;
        private String content;
    }
    @Setter
    @Getter
    public static class Patch{
        private long groupId;
        private String groupName;
        private String groupImage;
        private int applyLimit;
        private String place;
        private String content;
    }
}
