package com.main.volunteer.domain.volunteer.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Condition {

    String volunteerName;
    String organizationName;
    Long tagId;
    String province;
    String city;
    String orderCriteria;
    String sort;
    int pageNum;
}
