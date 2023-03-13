package com.main.volunteer.domain.membergroup.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.member.entity.Member;
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

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
