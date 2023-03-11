package com.main.volunteer.group.entity;

import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
public class MemberGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberGroupId;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    /* Member class 추가 되었을때 주석 삭제 */
//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
}
