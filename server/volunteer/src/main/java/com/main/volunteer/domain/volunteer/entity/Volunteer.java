package com.main.volunteer.domain.volunteer.entity;


import com.main.volunteer.audit.Auditable;
import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.like.entity.Like;
import com.main.volunteer.domain.review.entity.Review;
import com.main.volunteer.domain.tag.entity.Tag;
import com.main.volunteer.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@NoArgsConstructor
@Getter @Setter
public class Volunteer extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long volunteerId;

    @Column(nullable = false)
    private String title;

//    private String volunteerImage;

    @Column(nullable = false)
    private LocalDateTime applyDate;

    @Column(nullable = false)
    private LocalDateTime volunteerDate;

    private Integer volunteerTime = 0;

    @Column(nullable = false)
    private String place;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer applyLimit;

    private Integer applyCount = 0;

    private Integer likeCount = 0;

    @ManyToOne
    @JoinColumn(name = "ORGANIZATION_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    @Enumerated(EnumType.STRING)
    private VolunteerStatus volunteerStatus;

    @OneToMany(mappedBy = "volunteer", cascade = CascadeType.PERSIST)
    private List<Review> reviewList = new ArrayList<>();

    @OneToMany(mappedBy = "volunteer", cascade = CascadeType.PERSIST)
    private List<Apply> applyList = new ArrayList<>();

    @OneToMany(mappedBy = "volunteer", cascade = CascadeType.PERSIST)
    private List<Like> likeList = new ArrayList<>();




}
