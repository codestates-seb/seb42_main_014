package com.main.volunteer.member.entity;

import com.main.volunteer.audit.Auditable;
import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import com.main.volunteer.like.entity.Like;
import com.main.volunteer.point.entity.Point;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 20, unique = true)
    private String memberName;

    private String orgAddress;

    @Column(length = 10)
    private int orgNumber;

    private String profileImage;

    @Enumerated(EnumType.STRING)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Point point;

    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<Apply> applyList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "member" , cascade = CascadeType.PERSIST)
    private List<MemberGroup> memberGroups = new ArrayList<>();

    public enum MemberStatus{
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
}
