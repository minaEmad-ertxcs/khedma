package com.mina.khedma.model;

import com.mina.khedma.DAO.UserDAO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public record UserPrincipal(UserDAO userDAO) implements UserDetails {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return userDAO.getRole().getAuthorities();
    }

    @Override
    public String getPassword() {
        return userDAO.getPassword();
    }

    @Override
    public String getUsername() {
        return userDAO.getUsername();
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
        return true;
    }
}