package com.main.volunteer.domain.group.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.point.entity.Point;
import com.main.volunteer.domain.tag.entity.Tag;
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
@Table(name = "TEAM")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long groupId;
    private String groupName;
    private long groupZangId;
    private String groupImage;
    private int applyLimit;
    private String place;
    private String content;


    @OneToMany(mappedBy = "group" , cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<MemberGroup> memberGroups = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    @OneToMany(mappedBy = "group", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public Group(long groupId) {
        this.groupId = groupId;
    }
}
