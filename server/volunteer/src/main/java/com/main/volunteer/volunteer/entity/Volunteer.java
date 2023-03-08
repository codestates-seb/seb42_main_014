package com.main.volunteer.volunteer.entity;


import com.main.volunteer.audit.Auditable;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
public class Volunteer extends Auditable {

    @Id
    private Long volunteerId;

    private String title;

    private String content;

    private Integer viewCount;

    private LocalDateTime endDate;

    private VolunteerStatus volunteerStatus;


}
