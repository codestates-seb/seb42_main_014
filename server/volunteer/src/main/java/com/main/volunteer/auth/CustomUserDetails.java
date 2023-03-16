package com.main.volunteer.auth;

import com.main.volunteer.domain.member.entity.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CustomUserDetails extends Member implements UserDetails, OAuth2User {

    private Map<String, Object> attributes;

    public CustomUserDetails(Member member) {
        setMemberId(member.getMemberId());
        setMemberName(member.getMemberName());
        setEmail(member.getEmail());
        setPassword(member.getPassword());
        setRoles(member.getRoles());
        setVerifiedEmail(member.isVerifiedEmail());
    }

    public CustomUserDetails(Member member, Map<String, Object> attributes) {
        setMemberId(member.getMemberId());
        setMemberName(member.getMemberName());
        setEmail(member.getEmail());
        setPassword(member.getPassword());
        setRoles(member.getRoles());
        setVerifiedEmail(member.isVerifiedEmail());
        this.attributes = attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<String> roles = this.getRoles();
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isVerifiedEmail();
    }

    @Override
    public String getName() {
        return null;
    }
}

