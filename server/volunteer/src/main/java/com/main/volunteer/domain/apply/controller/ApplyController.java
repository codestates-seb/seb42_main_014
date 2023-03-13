package com.main.volunteer.domain.apply.controller;

import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.apply.mapper.ApplyMapper;
import com.main.volunteer.domain.apply.service.ApplyService;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> postApply(@PathVariable("volunteer-id") Long volunteerId, @PathParam("member-id") Long memberId){

        Member member = new Member(); //jwt 구현후 삭제 예정
        member.setMemberId(memberId); //jwt 구현후 삭제 예정
        Apply apply = new Apply();
        apply.setMember(member);

        Apply createdApply = applyService.createApply(apply, volunteerId);


        URI uri = UriUtil.createUri(DEFAULT_URI, createdApply.getApplyId());
        return ResponseEntity.created(uri).body(ApiResponse.ok("data", applyMapper.applyToResponse(createdApply)));
    }

    @PatchMapping("/{volunteer-id}")
    public ResponseEntity<?> cancelApply(@PathVariable("volunteer-id") Long volunteerId, @PathParam("member-id") Long memberId) {

        Member member = new Member(); //jwt 구현후 삭제 예정
        member.setMemberId(memberId); //jwt 구현후 삭제 예정

        Apply canceledApply = applyService.cancelApply(volunteerId, member);

        return ResponseEntity.ok().body(ApiResponse.ok("data", applyMapper.applyToResponse(canceledApply)));
    }

    @GetMapping
    public ResponseEntity<?> getApplyList(@PathParam("member-id") Long memberId) {
        Member member = new Member(); //jwt 구현후 삭제 예정
        member.setMemberId(memberId); //jwt 구현후 삭제 예정

        List<Apply> applyList = applyService.getApplyList(member);
        return ResponseEntity.ok().body(ApiResponse.ok("data", applyMapper.applyListToResponseList(applyList)));
    }


}
