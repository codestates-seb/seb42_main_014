package com.main.volunteer.group.entity;


import com.main.volunteer.comment.entity.Comment;
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
@Table(name = "GROUPS")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long groupId;
    private String groupName;
    private long groupZang;
    private String groupImage;
    private int applyLimit;
    private String place;
    private String content;

    @OneToMany(mappedBy = "group")
    List<MemberGroup> memberGroups = new ArrayList<>();

    /* Tag class 추가 되었을때 주석 삭제*/
//    @OneToOne(mappedBy = "group")
//    private Tag tag;

    @OneToMany(mappedBy = "group")
    List<Comment> comments = new ArrayList<>();
}
