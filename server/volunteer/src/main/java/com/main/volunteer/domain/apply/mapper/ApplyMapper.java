package com.main.volunteer.domain.apply.mapper;

import com.main.volunteer.domain.apply.dto.ApplyDto;
import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.apply.entity.ApplyStatus;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ApplyMapper {
    default ApplyDto.Response applyToResponse(Apply apply){
        if ( apply == null ) {
            return null;
        }


        Long applyId = apply.getApplyId();
        ApplyStatus applyStatus = apply.getApplyStatus();

        int memberId = apply.getMember().getMemberId();
        Long volunteerId = apply.getVolunteer().getVolunteerId();


        return new ApplyDto.Response( applyId, applyStatus, memberId, volunteerId );
    }

}
