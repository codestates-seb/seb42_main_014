package com.main.volunteer.domain.member.dto;

import com.main.volunteer.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
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

        private String orgAddress;

        private Long orgNumber;

        private boolean checkOrg;

        private boolean verifiedEmail;

        private List<String> roles;

        private int point;

        public void setRoles(List<String> roles) {
            this.roles = roles;
        }

        public void setVerifiedEmail(boolean verifiedEmail) {
            this.verifiedEmail = verifiedEmail;
        }

        public void setPoint(int point) {
            this.point = point;
        }
    }

    @Getter
    public static class Patch{

        private Long memberId;

        private String memberName;

        private String password;

        public void setMemberId(Long memberId) {
            this.memberId = memberId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response{

        private Long memberId;

        private String email;

        private boolean verifiedEmail;

        private String password;

        private String memberName;

        private String orgAddress;

        private Long orgNumber;

        private boolean checkOrg;

        private List<String> roles;

        private int point;

        private Member.MemberStatus memberStatus;
    }
}
