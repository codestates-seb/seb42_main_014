package com.main.volunteer.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
public class CommentDto {

    @Setter
    @Getter
    public static class Post{
        private long groupId;
        private String content;
    }

    @Setter
    @Getter
    public static class Patch{
        private String content;
    }

    @Setter
    @Getter
    public static class Response{
        private long commentId;
        private long memberId;
        private long groupId;
        private String memberName;
        private String content;
        private String profileImage;
        private LocalDateTime createdAt;
    }
}
