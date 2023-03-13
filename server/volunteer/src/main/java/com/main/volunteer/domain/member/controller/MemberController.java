package com.main.volunteer.domain.member.controller;

import com.main.volunteer.domain.member.dto.MemberDto;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.member.mapper.MemberMapper;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    public static final String DEFAULT_URI = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping
    public ResponseEntity postMember(@RequestBody @Valid MemberDto.Post memberPostDto){

        if(memberPostDto.isCheckOrg() == true){
            memberPostDto.setRoles(List.of("ORG", "USER"));
        }
        else{
            memberPostDto.setRoles(List.of("USER"));
        }

        Member postMember = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));

        URI uri = UriUtil.createUri(DEFAULT_URI, postMember.getMemberId());

        return ResponseEntity.created(uri).body(ApiResponse.created());
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity updateMember(@PathVariable("member-id") @Positive int memberId,
                                       @RequestBody @Valid MemberDto.Patch memberPatchDto){

        memberPatchDto.setMemberId(memberId);

        Member updateMember = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        return ResponseEntity.ok().body(ApiResponse.ok("data", updateMember));
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive int memberId){

        Member getMember = memberService.findMember(memberId);

        return ResponseEntity.ok().body(ApiResponse.ok("data", getMember));
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive int memberId){

        memberService.deleteMember(memberId);

        return ResponseEntity.ok().body(ApiResponse.ok());
    }
}
