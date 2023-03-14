package com.main.volunteer.auth.mail;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConfirmationToken {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(length = 36)
    private String id;

    @Column
    private boolean expired;

    @Column
    private Long memberId;

    public static ConfirmationToken createEmailConfirmationToken(Long memberId){
        ConfirmationToken confirmationToken = new ConfirmationToken();
        confirmationToken.memberId = memberId;
        confirmationToken.expired = false;

        return confirmationToken;
    }

    public void useToken(){
        expired = true;
    }
}
