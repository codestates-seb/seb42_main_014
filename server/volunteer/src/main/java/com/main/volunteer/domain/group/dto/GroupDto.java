package com.main.volunteer.domain.group.dto;

import com.main.volunteer.domain.comment.dto.CommentDto;
import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class GroupDto {
    @Setter
    @Getter
    public static class Post {
        @NotBlank(message = "그룹이름을 입력해주세요.")
        private String groupName;
        private String groupImage;
        private long groupZang;
        @NotNull(message = "인원을 입력해주세요.")
        private int applyLimit;
        private String place;
        @NotBlank(message = "소개글을 입력해주세요.")
        private String content;
        private Long tagId;
    }
    @Setter
    @Getter
    public static class Patch {
        private long groupId;
        private String groupName;
        private String groupImage;
        @NotNull(message = "인원을 입력해주세요.")
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
        private long groupZang;
        private int applyLimit;
        private String place;
        private String content;
        private Tag tag;
        private List<CommentDto.Response> comments;
    }
}
