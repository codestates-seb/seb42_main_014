package com.main.volunteer.like.entity;

import com.main.volunteer.audit.Auditable;
import com.main.volunteer.member.entity.Member;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "LIKES")
public class Like extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "VOLUNTEER_ID")
    private Volunteer volunteer;
}
