package com.main.volunteer.domain.volunteer.repository;

import com.main.volunteer.domain.volunteer.entity.Condition;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.repository.custom.VolunteerRepositoryCustom;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import javax.persistence.EntityManager;

import java.util.List;

import static com.main.volunteer.domain.volunteer.entity.QVolunteer.volunteer;

public class VolunteerRepositoryImpl extends QuerydslRepositorySupport implements VolunteerRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public VolunteerRepositoryImpl(EntityManager em) {
        super(Volunteer.class);
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<Volunteer> findBySearchOption(Condition condition) {


        Pageable pageable = PageRequest.of(condition.getPageNum() - 1, 12);
        OrderSpecifier orderSpecifiers = createOrderSpecifier(condition);

        List<Volunteer> volunteers = queryFactory
                .selectFrom(volunteer)
                .where(containVolunteerName(condition.getVolunteerName()), containOrganizationName(condition.getOrganizationName()),
                        eqTagId(condition.getTagId()), eqProvince(condition.getProvince()), eqCity(condition.getCity()))
                .orderBy(orderSpecifiers)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize()).fetch();



        return new PageImpl<>(volunteers, pageable,volunteers.size());
    }

    private OrderSpecifier createOrderSpecifier(Condition condition) {


        String orderCriteria = condition.getOrderCriteria();
        String sort = condition.getSort();


        if(orderCriteria.equals("volunteerTime")){
            return sort.equals("ASC") ? new OrderSpecifier(Order.ASC, volunteer.volunteerDate) : new OrderSpecifier(Order.DESC, volunteer.volunteerDate);
        }else if(orderCriteria.equals("applyLimit")){
            return sort.equals("ASC") ? new OrderSpecifier(Order.ASC, volunteer.applyLimit) : new OrderSpecifier(Order.DESC, volunteer.applyLimit);
        }else if(orderCriteria.equals("likeCount")){
            return sort.equals("ASC") ? new OrderSpecifier(Order.ASC, volunteer.likeCount) : new OrderSpecifier(Order.DESC, volunteer.likeCount);
        }

        return new OrderSpecifier(Order.DESC, volunteer.volunteerId);
    }


    private BooleanExpression containVolunteerName(String volunteerName) {

        return volunteerName == null || volunteerName.isEmpty() ? null :volunteer.title.containsIgnoreCase(volunteerName);
    }

    private BooleanExpression containOrganizationName(String organizationName) {

        return organizationName == null || organizationName.isEmpty() ? null : volunteer.member.memberName.eq(organizationName);
    }

    private BooleanExpression eqTagId(Long tagId) {

        return tagId == null ? null : volunteer.tag.tagId.eq(tagId);
    }

    private BooleanExpression eqProvince(String province) {

        return province == null || province.isEmpty() ? null : volunteer.place.containsIgnoreCase(province);
    }

    private BooleanExpression eqCity(String city) {

        return city == null || city.isEmpty() ? null : volunteer.place.containsIgnoreCase(city);
    }



}
