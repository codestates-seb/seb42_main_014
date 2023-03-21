package com.main.volunteer.domain.apply.controller;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.apply.mapper.ApplyMapper;
import com.main.volunteer.domain.apply.service.ApplyService;
import com.main.volunteer.domain.member.entity.Member;
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
@RequestMapping("/apply")
public class ApplyController {

    public static final String DEFAULT_URI = "/apply";

    private final ApplyService applyService;
    private final MemberService memberService;
    private final ApplyMapper applyMapper;

    public ApplyController(ApplyService applyService, MemberService memberService, ApplyMapper applyMapper) {
        this.applyService = applyService;
        this.memberService = memberService;
        this.applyMapper = applyMapper;
    }

    /**
    봉사 신청
     */
    @PostMapping("/{volunteer-id}")
    public ResponseEntity<?> postApply(@PathVariable("volunteer-id") Long volunteerId,@AuthenticationPrincipal CustomUserDetails userDetails){

        Apply apply = new Apply();
        Member member = memberService.findMember(userDetails.getMemberId());
        apply.setMember(member);

        Apply createdApply = applyService.createApply(apply, volunteerId);

        URI uri = UriUtil.createUri(DEFAULT_URI, createdApply.getApplyId());
        return ResponseEntity.created(uri).body(ApiResponse.ok("data", applyMapper.applyToResponse(createdApply)));
    }

    /**
    봉사 신청 취소
     */
    @PreAuthorize("isAuthenticated()")
    @PatchMapping("/{volunteer-id}")
    public ResponseEntity<?> cancelApply(@PathVariable("volunteer-id") Long volunteerId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Member member = memberService.findMember(userDetails.getMemberId());
        Apply canceledApply = applyService.cancelApply(volunteerId, member);

        return ResponseEntity.ok().body(ApiResponse.ok("data", applyMapper.applyToResponse(canceledApply)));
    }

    /**
    일반 사용자가 신청한 봉사 활동 목록
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/member/plan")
    public ResponseEntity<?> getMyPlanList(@RequestParam(value = "pageNum", defaultValue = "1")int pageNum, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Page<Apply> applyPage = applyService.getMyPlanList(pageNum -1, memberService.findMember(userDetails.getMemberId()));
        List<Apply> applyList = applyPage.getContent();

        return ResponseEntity.ok().body(ApiResponse.ok("data", applyMapper.applyListToResponseList(applyList), "totalPages", applyPage.getTotalPages()));
    }

    /**
    일반 사용자 봉사 활동 목록
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my/history")
    public ResponseEntity<?> getMyHistoryList(@RequestParam(value = "pageNum", defaultValue = "1")int pageNum, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Page<Apply> applyPage = applyService.getMyHistoryList(pageNum -1, memberService.findMember(userDetails.getMemberId()));
        List<Apply> applyList = applyPage.getContent();

        return ResponseEntity.ok().body(ApiResponse.ok("data", applyMapper.applyListToResponseList(applyList), "totalPages", applyPage.getTotalPages()));
    }

    /**
    기관이 등록한 특정 봉사 활동에 대한 신청자 목록
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/organization/{volunteer-id}")
    public ResponseEntity<?> getApplyListByOrganization(@RequestParam(value = "pageNum", defaultValue = "1")int pageNum, @PathVariable("volunteer-id") Long volunteerId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Page<Apply> applyPage = applyService.getApplyListByOrganization(pageNum - 1, volunteerId, memberService.findMember(userDetails.getMemberId()));
        List<Apply> applyList = applyPage.getContent();

        return ResponseEntity.ok().body(ApiResponse.ok("data", applyMapper.applyListToResponseToORGList(applyList), "totalPages",applyPage.getTotalPages()));
    }

}
