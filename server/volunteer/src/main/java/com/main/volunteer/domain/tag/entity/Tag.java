package com.main.volunteer.domain.tag.entity;

import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter @Setter
public class Tag{

    public Tag(Long tagId, String tagName) {
        this.tagId = tagId;
        this.tagName = tagName;
    }

    @Id
    private Long tagId;

    private String tagName;

    @OneToOne(mappedBy = "tag")
    private Group group;

}
