package com.portfolio.backend.service;

import com.portfolio.backend.dto.AuthRequest;
import com.portfolio.backend.dto.AuthResponse;
import com.portfolio.backend.security.JwtTokenProvider;
import com.portfolio.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthResponse authenticateUser(AuthRequest loginRequest) {
        log.info("Authentication attempt for username: {}", loginRequest.getUsername());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

            log.info("Authentication successful for username: {}, role: {}",
                    userPrincipal.getUsername(),
                    userPrincipal.getAuthorities().iterator().next().getAuthority());

            return new AuthResponse(
                    jwt,
                    userPrincipal.getUsername(),
                    userPrincipal.getAuthorities().iterator().next().getAuthority()
            );
        } catch (BadCredentialsException ex) {
            log.warn("Authentication failed for username: {} — bad credentials", loginRequest.getUsername());
            throw ex;
        } catch (Exception ex) {
            log.error("Unexpected error during authentication for username: {}", loginRequest.getUsername(), ex);
            throw ex;
        }
    }
}
