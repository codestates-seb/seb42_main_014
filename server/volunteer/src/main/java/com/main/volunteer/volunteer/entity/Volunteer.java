package com.main.volunteer.volunteer.entity;


import com.main.volunteer.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter @Setter
public class Volunteer extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long volunteerId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDateTime applyDate;

    @Column(nullable = false)
    private LocalDateTime volunteerDate;

    @Column(nullable = false)
    private String place;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer applyLimit;

    private Integer likeCount = 0;

    /*
    봉사를 등록한 organization 의 memberId
     */
//    @ManyToOne
//    @JoinColumn(name = "ORGANIZATION_ID")
//    private Member member;


    @Enumerated(EnumType.STRING)
    private VolunteerStatus volunteerStatus;


}
