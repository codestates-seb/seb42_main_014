package com.main.volunteer.domain.membergroup.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MemberGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberGroupId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
