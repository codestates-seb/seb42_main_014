package com.main.volunteer.auth.oauth;

import com.main.volunteer.auth.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException{

        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        Map<String, Object> kakao = (Map<String, Object>) attributes.get("kakao_account");
        String email = kakao.get("email").toString();
        List<String> authorities = List.of("USER");

        redirect(request, response, email, authorities);
    }

    private void redirect(HttpServletRequest request,
                          HttpServletResponse response,
                          String username, List<String> authorities) throws IOException{

        String accessToken = delegateAccessToken(username, authorities);

        String uri = createURI(accessToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
        response.setHeader("Authorization",  "Bearer" + accessToken);
    }

    private String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private URI createURI(String accessToken){

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(3000)
                .path("/token")
                .queryParam("Authorization", "Bearer" + accessToken)
                .build()
                .toUri();
    }
}
