package com.main.volunteer.domain.like.controller;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.like.entity.Like;
import com.main.volunteer.domain.like.mapper.LikeMapper;
import com.main.volunteer.domain.like.service.LikeService;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/likes")
public class LikeController {

    public static final String DEFAULT_URI =  "/likes";

    private final MemberService memberService;
    private final LikeService likeService;
    private final LikeMapper likeMapper;

    public LikeController(MemberService memberService, LikeService likeService, LikeMapper likeMapper) {
        this.memberService = memberService;
        this.likeService = likeService;
        this.likeMapper = likeMapper;
    }

    /*
    찜하기
     */
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/{volunteer-id}")
    public ResponseEntity<?> postLike(@PathVariable("volunteer-id") Long volunteerId,@AuthenticationPrincipal CustomUserDetails userDetails){

        Like like = new Like();
        like.setMember(memberService.findMember(userDetails.getMemberId()));

        Like createdLike = likeService.createLike(like, volunteerId);
        URI uri = UriUtil.createUri(DEFAULT_URI, createdLike.getLikeId());

        return ResponseEntity.created(uri).body(ApiResponse.ok("data", likeMapper.likeToResponse(createdLike)));

    }

    /*
    찜하기 취소
     */
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{volunteer-id}")
    public ResponseEntity<?> cancelLike(@PathVariable("volunteer-id") Long volunteerId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Like canceledLike = likeService.cancelLike(volunteerId, memberService.findMember(userDetails.getMemberId()));

        return ResponseEntity.ok().body(ApiResponse.ok("data", likeMapper.likeToResponse(canceledLike)));
    }

    /*
    내가 찜한 봉사 목록 조회
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my")
    public ResponseEntity<?> getMyLikeList(@RequestParam(value = "pageNum", defaultValue = "1")int pageNum, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Page<Like> MyLikePage = likeService.getMyLikeList(pageNum -1, memberService.findMember(userDetails.getMemberId()));
        List<Like> MyLikeList = MyLikePage.getContent();

        return ResponseEntity.ok().body(ApiResponse.ok("data", likeMapper.likeListToResponseList(MyLikeList), "totalPages", MyLikePage.getTotalPages()));
    }

}
