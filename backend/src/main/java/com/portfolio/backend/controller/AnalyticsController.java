package com.portfolio.backend.controller;

import com.portfolio.backend.dto.AnalyticsSummary;
import com.portfolio.backend.dto.TrackRequest;
import com.portfolio.backend.service.AnalyticsService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AnalyticsController {

    private static final Logger log = LoggerFactory.getLogger(AnalyticsController.class);

    private final AnalyticsService analyticsService;

    @PostMapping("/api/analytics/track")
    public ResponseEntity<Void> trackVisit(@RequestBody TrackRequest request, HttpServletRequest servletRequest) {
        String ipAddress = getClientIp(servletRequest);
        String userAgent = servletRequest.getHeader("User-Agent");
        log.debug("POST /api/analytics/track — page={}, ip={}", request.getPagePath(), ipAddress);
        analyticsService.trackVisitor(ipAddress, userAgent, request.getPagePath(), request.getSessionId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/downloads/track")
    public ResponseEntity<Void> trackDownload(@RequestBody TrackRequest request, HttpServletRequest servletRequest) {
        String ipAddress = getClientIp(servletRequest);
        String fileType = request.getFileType() != null ? request.getFileType() : "PDF_RESUME";
        log.info("POST /api/downloads/track — fileType={}, ip={}", fileType, ipAddress);
        analyticsService.trackDownload(ipAddress, fileType);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/admin/analytics/summary")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AnalyticsSummary> getAnalyticsSummary() {
        log.debug("GET /api/admin/analytics/summary — building analytics report");
        return ResponseEntity.ok(analyticsService.getSummary());
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isBlank()) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}
