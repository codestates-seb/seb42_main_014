package com.main.volunteer.domain.apply.controller;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.apply.mapper.ApplyMapper;
import com.main.volunteer.domain.apply.service.ApplyService;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
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
    private final ApplyMapper applyMapper;

    public ApplyController(ApplyService applyService, ApplyMapper applyMapper) {
        this.applyService = applyService;
        this.applyMapper = applyMapper;
    }

    /*
    봉사 신청
     */
    @PostMapping("/{volunteer-id}")
    public ResponseEntity<?> postApply(@PathVariable("volunteer-id") Long volunteerId,@AuthenticationPrincipal CustomUserDetails userDetails){

        Apply apply = new Apply();
        apply.setMember(userDetails);

        Apply createdApply = applyService.createApply(apply, volunteerId);


        URI uri = UriUtil.createUri(DEFAULT_URI, createdApply.getApplyId());
        return ResponseEntity.created(uri).body(ApiResponse.ok("data", applyMapper.applyToResponse(createdApply)));
    }

    /*
    봉사 신청 취소
     */
    @PreAuthorize("isAuthenticated()")
    @PatchMapping("/{volunteer-id}")
    public ResponseEntity<?> cancelApply(@PathVariable("volunteer-id") Long volunteerId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Apply canceledApply = applyService.cancelApply(volunteerId, userDetails);

        return ResponseEntity.ok().body(ApiResponse.ok("data", applyMapper.applyToResponse(canceledApply)));
    }

    /*
    일반 사용자가 신청한 봉사 활동 목록
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/member/plan")
    public ResponseEntity<?> getMyPlanList(@AuthenticationPrincipal CustomUserDetails userDetails) {

        List<Apply> applyList = applyService.getMyPlanList(userDetails);
        return ResponseEntity.ok().body(ApiResponse.ok("data", applyMapper.applyListToResponseList(applyList)));
    }

    /*
    일반 사용자 봉사 활동 목록
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my/history")
    public ResponseEntity<?> getMyHistoryList(@AuthenticationPrincipal CustomUserDetails userDetails) {

        List<Apply> applyList = applyService.getMyHistoryList(userDetails);
        return ResponseEntity.ok().body(ApiResponse.ok("data", applyMapper.applyListToResponseList(applyList)));
    }

    /*
    기관이 등록한 특정 봉사 활동에 대한 신청자 목록
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/organization/{volunteer-id}")
    public ResponseEntity<?> getApplyListByOrganization(@PathVariable("volunteer-id") Long volunteerId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<Apply> applyList = applyService.getApplyListByOrganization(volunteerId,userDetails);

        return ResponseEntity.ok().body(ApiResponse.ok("data", applyMapper.applyListToResponseList(applyList)));
    }

}
