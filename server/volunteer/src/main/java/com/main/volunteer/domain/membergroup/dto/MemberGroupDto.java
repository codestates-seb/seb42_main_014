package com.main.volunteer.domain.membergroup.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class MemberGroupDto {

    @AllArgsConstructor
    @Getter
    public static class Response{
        private long memberGroupId;
        private long memberId;
        private long groupId;
    }
}
