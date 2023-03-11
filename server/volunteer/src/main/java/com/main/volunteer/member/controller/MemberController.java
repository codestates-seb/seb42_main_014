package com.main.volunteer.member.controller;

import com.main.volunteer.member.dto.MemberDto;
import com.main.volunteer.member.entity.Member;
import com.main.volunteer.member.mapper.MemberMapper;
import com.main.volunteer.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping
    public ResponseEntity postMember(@RequestBody @Valid MemberDto.Post memberPostDto){

        Member postMember = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));


        return new ResponseEntity<>(mapper.memberToMemberResponseDto(postMember), HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity updateMember(@PathVariable("member-id") @Positive int memberId,
                                       @RequestBody @Valid MemberDto.Patch memberPatchDto){

        memberPatchDto.setMemberId(memberId);

        Member updateMember = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(updateMember), HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive int memberId){

        Member getMember = memberService.findMember(memberId);

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(getMember), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive int memberId){

        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
