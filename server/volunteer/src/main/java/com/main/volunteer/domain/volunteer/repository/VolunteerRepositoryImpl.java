package com.main.volunteer.domain.volunteer.repository;

import com.main.volunteer.domain.tag.entity.Tag;
import com.main.volunteer.domain.volunteer.entity.QVolunteer;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.repository.custom.VolunteerRepositoryCustom;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Volunteer> findBySearchOption(String volunteerName, String organizationName, Long tagId, String province, String city) {

        JPQLQuery<Volunteer> query = queryFactory
                .selectFrom(volunteer)
                .where(containVolunteerName(volunteerName), containOrganizationName(organizationName),
                eqTagId(tagId), eqProvince(province), eqCity(city));

        return query.fetch();
    }




    private BooleanExpression containVolunteerName(String volunteerName) {
        if (volunteerName == null || volunteerName.isEmpty()) {
            return null;
        }
        return volunteer.title.containsIgnoreCase(volunteerName);
    }

    private BooleanExpression containOrganizationName(String organizationName) {
        if(organizationName == null || organizationName.isEmpty()){
            return null;
        }
        return volunteer.member.memberName.eq(organizationName);
    }

    private BooleanExpression eqTagId(Long tagId) {
        if(tagId == null) {
            return null;
        }
        return volunteer.tag.tagId.eq(tagId);
    }

    private BooleanExpression eqProvince(String province) {
        if(province == null || province.isEmpty()) {
            return null;
        }
        return volunteer.place.containsIgnoreCase(province);
    }

    private BooleanExpression eqCity(String city) {
        if (city == null || city.isEmpty()) {
            return null;
        }
        return volunteer.place.containsIgnoreCase(city);
    }


}
