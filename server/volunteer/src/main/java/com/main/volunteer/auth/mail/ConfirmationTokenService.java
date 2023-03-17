package com.main.volunteer.auth.mail;

import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConfirmationTokenService {

    @Value("${domain}")
    private String domain;

    private final EmailSenderService emailSenderService;
    private final ConfirmationTokenRepository confirmationTokenRepository;

    public void createEmailConfirmationToken(Long memberId, String receiverEmail){

        ConfirmationToken emailConfirmationToken = ConfirmationToken.createEmailConfirmationToken(memberId);

        confirmationTokenRepository.save(emailConfirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(receiverEmail);
        mailMessage.setSubject("회원가입 이메일 인증");
        mailMessage.setText(domain + "/members/confirm-email?token=" + emailConfirmationToken.getId());
        emailSenderService.sendEmail(mailMessage);
    }

    public ConfirmationToken findByIdAndExpired(String confirmationTokenId){
        Optional<ConfirmationToken> confirmationToken =
                confirmationTokenRepository.findByIdAndExpired(confirmationTokenId,false);

        return confirmationToken.orElseThrow(()-> new BusinessException(ExceptionCode.TOKEN_EXPIRED));
    }

    public void useToken(ConfirmationToken token){
        token.setExpired(true);
        confirmationTokenRepository.save(token);
    }
}
