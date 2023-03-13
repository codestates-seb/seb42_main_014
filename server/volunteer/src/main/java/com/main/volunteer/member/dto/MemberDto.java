package com.main.volunteer.member.dto;

import com.main.volunteer.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class Post{

        @Email
        @NotBlank
        private String email;

        @NotBlank
        private String password;

        @NotBlank
        private String memberName;

        private boolean checkOrg;

        private List<String> roles;

        public void setRoles(List<String> roles) {
            this.roles = roles;
        }
    }

    @Getter
    public static class Patch{

        private int memberId;

        private String memberName;

        private String password;

        public void setMemberId(int memberId) {
            this.memberId = memberId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response{

        private int memberId;

        private String email;

        private String password;

        private String memberName;

        private int point;

        private Member.MemberStatus memberStatus;
    }
}
