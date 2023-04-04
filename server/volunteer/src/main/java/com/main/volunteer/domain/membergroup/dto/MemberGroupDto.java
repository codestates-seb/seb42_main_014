package com.main.volunteer.domain.membergroup.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.volunteer.domain.group.entity.Group;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class MemberGroupDto {

    @AllArgsConstructor
    @Getter
    public static class Post{
        private long groupId;
        private Group group;
    }
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        @JsonProperty("id")
        private long memberGroupId;
        @JsonProperty("member_id")
        private long memberId;
        @JsonProperty("group_id")
        private long groupId;
        @JsonProperty("group_name")
        private String groupName;
    }
    @AllArgsConstructor
    @Getter
    @Setter
    public static class MemberDetails{
        @JsonProperty("member_id")
        private long memberId;
        @JsonProperty("member_name")
        private String memberName;
        @JsonProperty("point_count")
        private int pointCount;

        private String profileImage;

    }
}
