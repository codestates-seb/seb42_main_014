package com.main.volunteer.domain.volunteer.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Condition {

    String volunteerName;
    String organizationName;
    String tagName;
    String province;
    String city;
    String orderCriteria;
    String sort;
    int pageNum;
}
