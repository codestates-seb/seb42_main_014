package com.main.volunteer.domain.point.entity;

import com.main.volunteer.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pointId;

    private int pointCount;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
