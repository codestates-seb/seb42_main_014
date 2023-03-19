package com.main.volunteer.domain.like.service;


import com.main.volunteer.domain.like.entity.Like;
import com.main.volunteer.domain.like.repository.LikeRepository;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.entity.VolunteerStatus;
import com.main.volunteer.domain.volunteer.service.VolunteerService;
import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    private final VolunteerService volunteerService;
    private final LikeRepository likeRepository;

    public LikeService(VolunteerService volunteerService, LikeRepository likeRepository) {
        this.volunteerService = volunteerService;
        this.likeRepository = likeRepository;
    }

    /*
    찜하기 로직
     */
    public Like createLike(Like like, Long volunteerId) {

        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);
        like.setVolunteer(volunteer);

        if(volunteer.getVolunteerStatus() == VolunteerStatus.VOLUNTEER_AFTER){
            throw new BusinessException(ExceptionCode.VOLUNTEER_STATUS_AFTER);
        }else if(volunteer.getVolunteerStatus() == VolunteerStatus.VOLUNTEER_APPLY_AFTER){
            throw new BusinessException(ExceptionCode.VOLUNTEER_APPLY_LIMIT_OVER);
        }

        return verifyLikeStatus(like);
    }

    /*
    찜하기 취소 로직
     */
    public Like cancelLike(Long volunteerId, Member member) {

        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);

        Optional<Like> optional = likeRepository.findByVolunteerAndMember(volunteer, member);
        Like like = optional.orElseThrow(() -> new BusinessException(ExceptionCode.LIKE_NOT_EXIST));

        volunteerService.minusLikeCount(like.getVolunteer());
        likeRepository.delete(like);

        return like;
    }

    /*
    내가 찜한 봉사 목록 조회 로직
     */
    public List<Like> getMyLikeList(Member member) {

        Optional<List<Like>> optional = likeRepository.findAllByMember(member);

        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.LIKE_NOT_EXIST));
    }

    // 찜 상태 검증 로직
    private Like verifyLikeStatus(Like like) {

        Optional<Like> optional = likeRepository.findByVolunteerAndMember(like.getVolunteer(), like.getMember());

        if(optional.isPresent()) {

            throw new BusinessException(ExceptionCode.LIKE_ALREADY);

        }else{
            volunteerService.plusLikeCount(like.getVolunteer());

            return likeRepository.save(like);
        }
    }
}
