package com.portfolio.backend.controller;

import com.portfolio.backend.dto.AuthRequest;
import com.portfolio.backend.dto.AuthResponse;
import com.portfolio.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateUser(@Valid @RequestBody AuthRequest loginRequest) {
        log.info("POST /api/auth/login — login attempt for username: {}", loginRequest.getUsername());
        AuthResponse response = authService.authenticateUser(loginRequest);
        log.info("POST /api/auth/login — login successful for username: {}", loginRequest.getUsername());
        return ResponseEntity.ok(response);
    }
}
