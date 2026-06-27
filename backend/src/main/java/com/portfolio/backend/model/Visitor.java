package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitors")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ipHash; // Privacy-safe hashed IP

    private String userAgent;

    private String pagePath; // e.g., "/projects", "/resume"

    private LocalDateTime visitedAt;

    private String sessionId; // Frontend generated session identifier

    @PrePersist
    protected void onCreate() {
        visitedAt = LocalDateTime.now();
    }
}
