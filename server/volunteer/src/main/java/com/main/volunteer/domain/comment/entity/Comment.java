package com.main.volunteer.domain.comment.entity;

import com.main.volunteer.audit.Auditable;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;
    private String content;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @ManyToOne
    @JoinColumn(name= "member_id")
    private Member member;
}
