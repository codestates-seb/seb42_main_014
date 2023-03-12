package com.main.volunteer.point.entity;

import com.main.volunteer.member.entity.Member;
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
    private int pointId;

    private int pointCount;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
