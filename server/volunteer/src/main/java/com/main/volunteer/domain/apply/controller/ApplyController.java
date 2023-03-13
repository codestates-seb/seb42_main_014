package com.main.volunteer.domain.apply.controller;

import com.main.volunteer.domain.apply.dto.ApplyDto;
import com.main.volunteer.domain.apply.entity.Apply;
import com.main.volunteer.domain.apply.mapper.ApplyMapper;
import com.main.volunteer.domain.apply.service.ApplyService;
import com.main.volunteer.member.entity.Member;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.net.URI;

@RestController
public class ApplyController {

    public static final String DEFAULT_URI = "/apply";

    private final ApplyService applyService;

    public ApplyController(ApplyService applyService) {
        this.applyService = applyService;
    }


    @PostMapping("/{volunteer-id}")
    public ResponseEntity<?> postApply(@PathVariable("volunteer-id") Long volunteerId, @PathParam("member-id") int memberId){

        Member member = new Member(); //jwt 구현후 삭제 예정
        member.setMemberId(memberId); //jwt 구현후 삭제 예정
        Apply apply = new Apply();
        apply.setMember(member);

        Apply createdApply = applyService.createApply(apply, volunteerId);

        URI uri = UriUtil.createUri(DEFAULT_URI, createdApply.getApplyId());
        return ResponseEntity.created(uri).body(ApiResponse.created());
    }
}
