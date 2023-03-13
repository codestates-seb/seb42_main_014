package com.main.volunteer.domain.apply.controller;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.apply.mapper.ApplyMapper;
import com.main.volunteer.domain.apply.service.ApplyService;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


import javax.websocket.server.PathParam;
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


    @PostMapping("/{volunteer-id}")
    public ResponseEntity<?> postApply(@PathVariable("volunteer-id") Long volunteerId,@AuthenticationPrincipal CustomUserDetails userDetails){

        Apply apply = new Apply();
        apply.setMember(userDetails);

        Apply createdApply = applyService.createApply(apply, volunteerId);


        URI uri = UriUtil.createUri(DEFAULT_URI, createdApply.getApplyId());
        return ResponseEntity.created(uri).body(ApiResponse.ok("data", applyMapper.applyToResponse(createdApply)));
    }

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
    @GetMapping("/my")
    public ResponseEntity<?> getMyApplyList(@AuthenticationPrincipal CustomUserDetails userDetails) {

        List<Apply> applyList = applyService.getMyApplyList(userDetails);
        return ResponseEntity.ok().body(ApiResponse.ok("data", applyMapper.applyListToResponseList(applyList)));
    }

    /*
    기관이 등록한 특정 봉사 활동에 대한 신청자 목록
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{volunteer-id}")
    public ResponseEntity<?> getApplyListByVolunteer(@PathVariable("volunteer-id") Long volunteerId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<Apply> applyList = applyService.getApplyListByVolunteer(volunteerId,userDetails);

        return ResponseEntity.ok().body(ApiResponse.ok("data", applyMapper.applyListToResponseList(applyList)));
    }

}
