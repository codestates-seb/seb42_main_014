package com.main.volunteer.member.service;

import com.main.volunteer.auth.utils.CustomAuthorityUtils;
import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import com.main.volunteer.member.entity.Member;
import com.main.volunteer.member.repository.MemberRepository;
import com.main.volunteer.point.entity.Point;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member createMember(Member member){

        verifyEmail(member.getEmail());
        verifyMemberName(member.getMemberName());

        member.setPoint(new Point());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

       return memberRepository.save(member);
    }

    public Member updateMember(Member member){

        Member findMember = verifiedMember(member.getMemberId());

        Optional.ofNullable(member.getMemberName())
                .ifPresent(memberNickName -> findMember.setMemberName(memberNickName));
        verifyMemberName(findMember.getMemberName());

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
        Member findMember = optionalMember.orElseThrow(()-> new BusinessException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    public void verifyEmail(String email){

       Optional<Member> verifiedMember = memberRepository.findByEmail(email);

        if(verifiedMember.isPresent()){
            throw new BusinessException(ExceptionCode.MEMBER_EXIST);
        }
    }

    public void verifyMemberName(String memberName){

        Optional<Member> verifiedMember = memberRepository.findByMemberName(memberName);

        if(verifiedMember.isPresent()){
            throw new BusinessException(ExceptionCode.NICKNAME_EXIST);
        }
    }
}
