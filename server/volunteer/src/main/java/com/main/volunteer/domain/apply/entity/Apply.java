package com.main.volunteer.domain.apply.entity;

import com.main.volunteer.audit.Auditable;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Apply extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applyId;

    @Enumerated(EnumType.STRING)
    private ApplyStatus applyStatus;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "VOLUNTEER_ID")
    private Volunteer volunteer;


}
