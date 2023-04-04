package com.main.volunteer.domain.member.service;

import com.main.volunteer.auth.mail.ConfirmationToken;
import com.main.volunteer.auth.mail.ConfirmationTokenService;
import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import com.main.volunteer.domain.member.entity.Member;
import com.main.volunteer.domain.member.repository.MemberRepository;
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
    private final ConfirmationTokenService confirmationTokenService;

    public Member createMember(Member member){

        verifyEmail(member.getEmail());
        verifyMemberName(member.getMemberName());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        Member savedMember = memberRepository.save(member);

        confirmationTokenService.createEmailConfirmationToken(member.getMemberId(), member.getEmail());

       return savedMember;
    }

    public Member updateMember(Member member){

        Member findMember = verifiedMember(member.getMemberId());

        Optional.ofNullable(member.getMemberName())
                .ifPresent(memberNickName -> findMember.setMemberName(verifyMemberName(memberNickName)));

        Optional.ofNullable(member.getPassword())
                .ifPresent(memberPassword -> findMember.setPassword(passwordEncoder.encode(memberPassword)));

        Optional.ofNullable(member.getProfileImage())
                .ifPresent(memberProfileImage -> findMember.setProfileImage(memberProfileImage));

        return memberRepository.save(findMember);
    }

    public Member findMember(long memberId){

        return verifiedMember(memberId);
    }

    public void deleteMember(long memberId){
        Member findMember = verifiedMember(memberId);
//        findMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        memberRepository.delete(findMember);
    }

    public Member verifiedMember(long memberId){
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

    public void confirmEmail(String token){
        ConfirmationToken findConfirmationToken = confirmationTokenService.findByIdAndExpired(token);
        Optional<Member> optionalMember = memberRepository.findById(findConfirmationToken.getMemberId());
        Member findMember = optionalMember.orElseThrow(()-> new BusinessException(ExceptionCode.MEMBER_NOT_FOUND));

        confirmationTokenService.useToken(findConfirmationToken);
        findMember.setVerifiedEmail(true);
        memberRepository.save(findMember);
    }

    public String  verifyMemberName(String memberName){

        Optional<Member> verifiedMember = memberRepository.findByMemberName(memberName);

        if(verifiedMember.isPresent()){
            throw new BusinessException(ExceptionCode.NICKNAME_EXIST);
        }
        return memberName;
    }

    public boolean checkPassword(Long memberId, String checkPassword){
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.MEMBER_NOT_FOUND));

        String realPassword = member.getPassword();
        boolean matches = passwordEncoder.matches(checkPassword, realPassword);

        return matches;
    }

    public List<Member> findByOrganizationName(String memberName){
        Optional<List<Member>> optional = memberRepository.findByMemberNameContaining(memberName);
        List<Member> memberList = optional.orElseThrow(()-> new RuntimeException("등록된 봉사 기관이 없습니다."));
        memberList.removeIf(member -> !member.getRoles().contains("ORG"));

        return memberList;
    }
}
