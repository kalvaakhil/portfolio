package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "downloads")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Download {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileType; // e.g. "PDF_RESUME"

    private LocalDateTime downloadedAt;

    private String ipHash; // Privacy-safe hashed IP

    @PrePersist
    protected void onCreate() {
        downloadedAt = LocalDateTime.now();
    }
}
