package com.main.volunteer.domain.volunteer.repository;

import com.main.volunteer.domain.volunteer.entity.QVolunteer;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.repository.custom.VolunteerRepositoryCustom;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

//public class VolunteerRepositoryImpl extends QuerydslRepositorySupport implements VolunteerRepositoryCustom {
//
//    @Autowired
//    private JPAQueryFactory queryFactory;
//
//    public VolunteerRepositoryImpl() {
//        super(Volunteer.class);
//    }
//
//    public List<Volunteer> findBySearchOption(Long tagId, String province, String city){
//        JPQLQuery<Volunteer> query =  queryFactory.selectFrom(QVolunteer.volunteer)
//                .where(eqProvince(province), eqCity(city), eqGu(gu), containName(name));
//
//        List<Volunteer> volunteers = this.getQuerydsl().applyPagination(pageable, query).fetch();
//        return new List<Volunteer>(volunteers, pageable, query.fetchCount());
//
//        private BooleanExpression eqProvince(String province) {
//            if(city == null || city.isEmpty()) {
//                return null;
//            }
//            return cafe.city.eq(city);
//        }
//
//        private BooleanExpression eqCity(String city) {
//            if(gu == null || gu.isEmpty()) {
//                return null;
//            }
//            return cafe.gu.eq(gu);
//        }
//
//        private BooleanExpression containName(String name) {
//            if(name == null || name.isEmpty()) {
//                return null;
//            }
//            return cafe.name.containsIgnoreCase(name);
//        }
//
//
//    }
//}
