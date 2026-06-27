package com.portfolio.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private final String tokenType = "Bearer";
    private String username;
    private String role;
}
