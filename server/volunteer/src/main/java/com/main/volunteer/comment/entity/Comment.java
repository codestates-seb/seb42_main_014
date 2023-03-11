package com.main.volunteer.comment.entity;

import com.main.volunteer.audit.Auditable;
import com.main.volunteer.group.entity.Group;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@NoArgsConstructor
public class Comment extends Auditable {
    @Id
    private long commentId;
    private String content;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    /* Member class 가 추가 되면 주석 삭제 */
//    @ManyToOne
//    @JoinColumn(name= "member_id")
//    private Member member;
}
