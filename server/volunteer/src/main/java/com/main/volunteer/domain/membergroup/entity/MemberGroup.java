package com.main.volunteer.domain.membergroup.entity;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public MemberGroup(Group group, Member member) {
        this.group = group;
        this.member = member;
    }
    public Long getMemberId() {
        return member.getMemberId();
    }

    public Long getGroupId() {
        return group.getGroupId();
    }
}
