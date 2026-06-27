package com.portfolio.backend.dto;

import lombok.Data;

@Data
public class TrackRequest {
    private String pagePath;
    private String sessionId;
    private String fileType; // Only for download tracking (e.g. "PDF_RESUME")
}
