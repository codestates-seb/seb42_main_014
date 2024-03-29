package com.main.volunteer.domain.tag.entity;

import com.main.volunteer.domain.group.entity.Group;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Entity
@NoArgsConstructor
@Getter @Setter
public class Tag{

    public Tag(String tagName) {
        this.tagName = tagName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    private String tagName;

}
