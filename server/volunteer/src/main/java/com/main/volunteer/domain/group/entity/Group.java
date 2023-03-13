package com.main.volunteer.domain.group.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main.volunteer.domain.comment.entity.Comment;
import com.main.volunteer.domain.membergroup.entity.MemberGroup;
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

    @JsonIgnore
    @OneToMany(mappedBy = "group" , cascade = CascadeType.PERSIST)
    private List<MemberGroup> memberGroups = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    @JsonIgnore
    @OneToMany(mappedBy = "group", cascade = CascadeType.PERSIST)
    private List<Comment> comments = new ArrayList<>();
}
