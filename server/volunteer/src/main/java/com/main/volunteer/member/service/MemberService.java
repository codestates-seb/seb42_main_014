package com.main.volunteer.member.service;

import com.main.volunteer.member.entity.Member;
import com.main.volunteer.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member createMember(Member member){

        verifyEmail(member.getEmail());
        verifyNickName(member.getNickName());

       return memberRepository.save(member);
    }

    public Member updateMember(Member member){

        Member findMember = verifiedMember(member.getMemberId());

        Optional.ofNullable(member.getNickName())
                .ifPresent(memberNickName -> findMember.setNickName(memberNickName));
        verifyNickName(findMember.getNickName());

        Optional.ofNullable(member.getPassword())
                .ifPresent(memberPassword -> findMember.setPassword(memberPassword));

        return memberRepository.save(findMember);
    }

    public Member findMember(int memberId){

        return verifiedMember(memberId);
    }

    public void deleteMember(int memberId){
        Member findMember = verifiedMember(memberId);
        findMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        memberRepository.save(findMember);
    }

    public Member verifiedMember(int memberId){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(()-> new RuntimeException("MEMBER_NOT_FOUND"));

        return findMember;
    }

    public void verifyEmail(String email){

       Optional<Member> verifiedMember = memberRepository.findByEmail(email);

        if(verifiedMember.isPresent()){
            throw new RuntimeException("MEMBER_EXIST");
        }
    }

    public void verifyNickName(String nickName){

        Optional<Member> verifiedMember = memberRepository.findByNickName(nickName);

        if(verifiedMember.isPresent()){
            throw new RuntimeException("NICKNAME_EXIST");
        }
    }
}
