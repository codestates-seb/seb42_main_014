package com.main.volunteer.domain.volunteer.repository;

import com.main.volunteer.domain.volunteer.entity.Condition;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.entity.VolunteerStatus;
import com.main.volunteer.domain.volunteer.repository.custom.VolunteerRepositoryCustom;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import javax.persistence.EntityManager;

import static com.main.volunteer.domain.volunteer.entity.QVolunteer.volunteer;

@Slf4j
public class VolunteerRepositoryImpl extends QuerydslRepositorySupport implements VolunteerRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public VolunteerRepositoryImpl(EntityManager em) {
        super(Volunteer.class);
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<Volunteer> findBySearchOption(Condition condition) {

        Pageable pageable = PageRequest.of(condition.getPageNum() - 1, 12);

        QueryResults<Volunteer> volunteers = queryFactory
                .selectFrom(volunteer)
                .where(containVolunteerName(condition.getVolunteerName()), containOrganizationName(condition.getOrganizationName()),
                        eqTagName(condition.getTagName()), eqProvince(condition.getProvince()), eqCity(condition.getCity()))
                .where(volunteer.volunteerStatus.eq(VolunteerStatus.VOLUNTEER_APPLYING))
                .orderBy(createOrderSpecifier(condition))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        return new PageImpl<>(volunteers.getResults(), pageable, volunteers.getTotal());
    }

    private OrderSpecifier<?> createOrderSpecifier(Condition condition) {

        String orderCriteria = condition.getOrderCriteria();
        String sort = condition.getSort();

        Order direction =  sort.equals("ASC") ? Order.ASC : Order.DESC;

        log.info("direction : " + direction);

        switch (orderCriteria) {
            case "volunteerTime":
                return new OrderSpecifier<>(direction, volunteer.volunteerTime);
            case "applyLimit":
                return new OrderSpecifier<>(direction, volunteer.applyLimit);
            case "likeCount":
                return new OrderSpecifier<>(direction, volunteer.likeCount);
        }

        return new OrderSpecifier<>(Order.DESC, volunteer.volunteerId);
    }


    private BooleanExpression containVolunteerName(String volunteerName) {

        return volunteerName == null || volunteerName.isEmpty() ? null : volunteer.title.containsIgnoreCase(volunteerName);
    }

    private BooleanExpression containOrganizationName(String organizationName) {

        return organizationName == null || organizationName.isEmpty() ? null : volunteer.member.memberName.containsIgnoreCase(organizationName);
    }

    private BooleanExpression eqTagName(String tagName) {

        return tagName == null || tagName.isEmpty() ? null : volunteer.tag.tagName.eq(tagName);
    }

    private BooleanExpression eqProvince(String province) {

        return province == null || province.isEmpty() ? null : volunteer.place.containsIgnoreCase(province);
    }

    private BooleanExpression eqCity(String city) {

        return city == null || city.isEmpty() ? null : volunteer.place.containsIgnoreCase(city);
    }

    private BooleanExpression eqStatusApplying(VolunteerStatus volunteerStatus){
        return volunteer.volunteerStatus.eq(VolunteerStatus.VOLUNTEER_APPLYING);
    }



}
