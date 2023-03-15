package com.main.volunteer.domain.like.mapper;

import com.main.volunteer.domain.like.dto.LikeDto;
import com.main.volunteer.domain.like.entity.Like;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LikeMapper {
    default LikeDto.Response likeToResponse(Like like){

        Long likeId = like.getLikeId();
        Long memberId = like.getMember().getMemberId();
        Long volunteerId = like.getVolunteer().getVolunteerId();


        return new LikeDto.Response(likeId, memberId, volunteerId);

    }

    List<LikeDto.Response> likeListToResponseList(List<Like> myLikeList);
}
