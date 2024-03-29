package com.main.volunteer.domain.point.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (member.getPoint() != this) {
            member.setPoint(this);
        }
    }
}
