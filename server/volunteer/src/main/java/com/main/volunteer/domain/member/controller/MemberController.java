package com.main.volunteer.domain.member.controller;

import com.main.volunteer.auth.CustomUserDetails;
import com.main.volunteer.domain.member.dto.MemberDto;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.member.mapper.MemberMapper;
import com.main.volunteer.domain.member.service.MemberService;
import com.main.volunteer.domain.point.entity.Point;
import com.main.volunteer.response.ApiResponse;
import com.main.volunteer.util.UriUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    @Value("${mail.address.admin}")
    private String adminMailAddress;

    public static final String DEFAULT_URI = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping("/register")
    public ResponseEntity postMember(@RequestBody @Valid MemberDto.Post memberPostDto){

        Member member = mapper.memberPostDtoToMember(memberPostDto);
        member.setPoint(new Point());

        if(memberPostDto.isCheckOrg()){
            memberPostDto.setRoles(List.of("ORG"));
        }
        else{
            memberPostDto.setRoles(List.of("USER"));
        }

        if(memberPostDto.getEmail().equals(adminMailAddress)){
            memberPostDto.setRoles(List.of("ADMIN", "GROUPZANG", "ORG", "USER"));
            memberPostDto.setVerifiedEmail(true);
            memberPostDto.setPoint(15);
        }

        Member postMember = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));

        URI uri = UriUtil.createUri(DEFAULT_URI, postMember.getMemberId());

        return ResponseEntity.created(uri).body(ApiResponse.created("data", mapper.memberToMemberResponseDto(postMember)));
    }

    @PatchMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity updateMember(@RequestBody @Valid MemberDto.Patch memberPatchDto,
                                       @AuthenticationPrincipal CustomUserDetails userDetails){

        memberPatchDto.setMemberId(userDetails.getMemberId());

        Member updateMember = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        return ResponseEntity.ok().body(ApiResponse.ok("data", mapper.memberToMemberResponseDto(updateMember)));
    }

    @GetMapping("/confirm-email")
    public String viewConfirmEmail(@Valid @RequestParam String token){

        memberService.confirmEmail(token);

        return "이메일 인증 완료";
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity getMember(@AuthenticationPrincipal CustomUserDetails userDetails){

        Member member = memberService.findMember(userDetails.getMemberId());

        return ResponseEntity.ok().body(ApiResponse.ok("data", mapper.memberToMemberResponseDto(member)));
    }

    @GetMapping("/me/checkPwd")
    @PreAuthorize("isAuthenticated()")
    public boolean checkPassword(@AuthenticationPrincipal CustomUserDetails userDetails,
                                 @RequestParam String checkPassword){

        return memberService.checkPassword(userDetails.getMemberId(), checkPassword);
    }

    @DeleteMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity deleteMember(@AuthenticationPrincipal CustomUserDetails userDetails){

        memberService.deleteMember(userDetails.getMemberId());

        return ResponseEntity.noContent().build();
    }
}
