package com.main.volunteer.domain.like.service;


import com.main.volunteer.domain.like.entity.Like;
import com.main.volunteer.domain.like.repository.LikeRepository;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.volunteer.entity.Volunteer;
import com.main.volunteer.domain.volunteer.entity.VolunteerStatus;
import com.main.volunteer.domain.volunteer.service.VolunteerService;
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
    봉사 찜하기
     */
    public Like createApply(Like like, Long volunteerId) {

        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);
        like.setVolunteer(volunteer);

        if(volunteer.getVolunteerStatus() == VolunteerStatus.VOLUNTEER_AFTER){
            throw new RuntimeException("완료된 봉사입니다.");
        }else if(volunteer.getVolunteerStatus() == VolunteerStatus.VOLUNTEER_APPLY_AFTER){
            throw new RuntimeException("모집이 완료된 봉사입니다.");
        }

        return verifyLikeStatus(like);
    }

    private Like verifyLikeStatus(Like like) {
        Optional<Like> optional = likeRepository.findByVolunteerAndMember(like.getVolunteer(), like.getMember());

        if(optional.isPresent()) {
            throw new RuntimeException("이미 신청이 완료된 봉사활동입니다.");
        }else{
            return likeRepository.save(like);
        }
    }

    /*
    봉사 찜하기 취소 로직
     */
    public Like cancelLike(Long volunteerId, Member member) {

        Volunteer volunteer = volunteerService.verifyExistVolunteer(volunteerId);

        Optional<Like> optional = likeRepository.findByVolunteerAndMember(volunteer, member);
        Like like = optional.orElseThrow(() -> new RuntimeException("해당하는 봉사 활동을 찜한 이력이 없습니다."));

        likeRepository.delete(like);

        return like;
    }

    /*
    내가 찜한 봉사 목록 조회 로직
     */
    public List<Like> getMyLikeList(Member member) {

        Optional<List<Like>> optional = likeRepository.findAllByMember(member);
        return optional.orElseThrow(() -> new RuntimeException("찜한 봉사가 없습니다."));
    }
}
