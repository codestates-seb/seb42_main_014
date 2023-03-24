package com.main.volunteer.auth.config;

import com.main.volunteer.auth.filter.JwtAuthenticationFilter;
import com.main.volunteer.auth.filter.JwtVerificationFilter;
import com.main.volunteer.auth.handler.MemberAccessDeniedHandler;
import com.main.volunteer.auth.handler.MemberAuthenticationEntryPoint;
import com.main.volunteer.auth.handler.MemberAuthenticationFailureHandler;
import com.main.volunteer.auth.handler.MemberAuthenticationSuccessHandler;
import com.main.volunteer.auth.jwt.JwtTokenizer;
import com.main.volunteer.auth.oauth.CustomOAuth2UserService;
import com.main.volunteer.auth.oauth.OAuth2MemberSuccessHandler;
import com.main.volunteer.auth.service.CustomUserDetailsService;
import com.main.volunteer.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final CustomUserDetailsService userDetailsService;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2MemberSuccessHandler oAuth2MemberSuccessHandler;
    private final MemberAuthenticationEntryPoint memberAuthenticationEntryPoint;
    private final MemberAccessDeniedHandler memberAccessDeniedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(memberAuthenticationEntryPoint)
                .accessDeniedHandler(memberAccessDeniedHandler)
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers("/members/register").permitAll()
                        .antMatchers("/members/me/*").authenticated()
                        .antMatchers(HttpMethod.POST, "/volunteers").hasRole("ORG")
                        .antMatchers(HttpMethod.DELETE, "/volunteers/*").hasRole("ORG")
                        .antMatchers(HttpMethod.GET, "/volunteers").permitAll()
                        .antMatchers(HttpMethod.GET, "/volunteers/*").permitAll()
                        .antMatchers("/apply/organization/*").hasRole("ORG")
                        .antMatchers("/apply/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/reviews/my/**").authenticated()
                        .antMatchers(HttpMethod.GET,"/reviews/**").permitAll()
                        .antMatchers("/reviews/**").authenticated()
                        .antMatchers("/likes/*").authenticated()
                        .antMatchers(HttpMethod.POST, "/comments").authenticated()
                        .antMatchers(HttpMethod.PATCH, "/comments/*").authenticated()
                        .antMatchers(HttpMethod.DELETE, "/comments/*").authenticated()
                        .antMatchers(HttpMethod.GET, "/comments/**").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/groups/*").hasRole("GROUPZANG")
                        .antMatchers(HttpMethod.DELETE, "/groups/*").hasRole("GROUPZANG")
                        .antMatchers(HttpMethod.GET, "/groups").permitAll()
                        .antMatchers(HttpMethod.GET, "/groups/*").permitAll()
                        .antMatchers("/member-groups/*").authenticated()
                        .antMatchers(HttpMethod.GET,"/member-groups").permitAll()
                        .anyRequest().permitAll())
                .oauth2Login()
                .successHandler(oAuth2MemberSuccessHandler)
                .userInfoEndpoint()
                .userService(customOAuth2UserService);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000","http://3.35.252.234:8080"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Refresh"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{

        @Override
        public void configure(HttpSecurity builder) throws Exception{
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils, userDetailsService);

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
