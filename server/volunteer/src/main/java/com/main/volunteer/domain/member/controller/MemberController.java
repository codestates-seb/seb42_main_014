package com.main.volunteer.domain.member.controller;

import com.main.volunteer.domain.member.dto.MemberDto;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.member.mapper.MemberMapper;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.domain.point.entity.Point;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import lombok.RequiredArgsConstructor;
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

        Member member = mapper.memberPostDtoToMember(memberPostDto);
        member.setPoint(new Point());

        Member postMember = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));

        URI uri = UriUtil.createUri(DEFAULT_URI, postMember.getMemberId());

        return ResponseEntity.created(uri).body(ApiResponse.created("data", mapper.memberToMemberResponseDto(postMember)));
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity updateMember(@PathVariable("member-id") @Positive Long memberId,
                                       @RequestBody @Valid MemberDto.Patch memberPatchDto){

        memberPatchDto.setMemberId(memberId);

        Member updateMember = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        return ResponseEntity.ok().body(ApiResponse.ok("data", mapper.memberToMemberResponseDto(updateMember)));
    }

    @GetMapping("/confirm-email")
    public String viewConfirmEmail(@Valid @RequestParam String token){

        memberService.confirmEmail(token);

        return "이메일 인증 완료";
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId){

        Member member = memberService.findMember(memberId);

        return ResponseEntity.ok().body(ApiResponse.ok("data", mapper.memberToMemberResponseDto(member)));
    }

    @GetMapping("/{member-id}/checkPwd")
    public boolean checkPassword(@PathVariable("member-id") @Positive long memberId,
                                 @RequestParam String checkPassword){

        return memberService.checkPassword(memberId, checkPassword);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId){

        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();
    }
}
