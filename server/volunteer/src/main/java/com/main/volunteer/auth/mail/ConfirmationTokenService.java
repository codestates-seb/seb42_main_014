package com.main.volunteer.auth.mail;

import com.main.volunteer.exception.BusinessException;
import com.main.volunteer.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConfirmationTokenService {

    private final EmailSenderService emailSenderService;
    private final ConfirmationTokenRepository confirmationTokenRepository;

    public String createEmailConfirmationToken(Long memberId, String receiverEmail){

        ConfirmationToken emailConfirmationToken = ConfirmationToken.createEmailConfirmationToken(memberId);
        confirmationTokenRepository.save(emailConfirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(receiverEmail);
        mailMessage.setSubject("회원가입 이메일 인증");
        mailMessage.setText("http://localhost:8080/confirm-email?token=" + emailConfirmationToken.getId());
        emailSenderService.sendEmail(mailMessage);

        return emailConfirmationToken.getId();
    }

    public ConfirmationToken findByIdAndExpired(String confirmationTokenId){
        Optional<ConfirmationToken> confirmationToken =
                confirmationTokenRepository.findByIdAndExpired(confirmationTokenId,false);

        return confirmationToken.orElseThrow(()-> new BusinessException(ExceptionCode.TOKEN_EXPIRED));
    }
}
