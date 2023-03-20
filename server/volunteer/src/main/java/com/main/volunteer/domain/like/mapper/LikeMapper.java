package com.main.volunteer.domain.like.mapper;

import com.main.volunteer.domain.like.dto.LikeDto;
import com.main.volunteer.domain.like.entity.Like;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LikeMapper {
    default LikeDto.Response likeToResponse(Like like){

        Long likeId = like.getLikeId();
        String volunteerName = like.getVolunteer().getTitle();
        String organizationName = like.getVolunteer().getMember().getMemberName();

        return new LikeDto.Response(likeId, volunteerName, organizationName);
    }

    List<LikeDto.Response> likeListToResponseList(List<Like> myLikeList);
}
