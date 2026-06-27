package com.portfolio.backend.service;

import com.portfolio.backend.dto.AnalyticsSummary;
import com.portfolio.backend.model.Download;
import com.portfolio.backend.model.Visitor;
import com.portfolio.backend.repository.DownloadRepository;
import com.portfolio.backend.repository.MessageRepository;
import com.portfolio.backend.repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final VisitorRepository visitorRepository;
    private final DownloadRepository downloadRepository;
    private final MessageRepository messageRepository;

    private String hashIp(String ipAddress) {
        if (ipAddress == null || ipAddress.isBlank()) {
            return "anonymous";
        }
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(ipAddress.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString().substring(0, 16); // Short hash
        } catch (Exception ex) {
            return Integer.toString(ipAddress.hashCode());
        }
    }

    @Transactional
    public void trackVisitor(String ipAddress, String userAgent, String pagePath, String sessionId) {
        String ipHash = hashIp(ipAddress);
        Visitor visitor = Visitor.builder()
                .ipHash(ipHash)
                .userAgent(userAgent)
                .pagePath(pagePath)
                .sessionId(sessionId)
                .build();
        visitorRepository.save(visitor);
    }

    @Transactional
    public void trackDownload(String ipAddress, String fileType) {
        String ipHash = hashIp(ipAddress);
        Download download = Download.builder()
                .ipHash(ipHash)
                .fileType(fileType)
                .build();
        downloadRepository.save(download);
    }

    @Transactional(readOnly = true)
    public AnalyticsSummary getSummary() {
        long totalPageViews = visitorRepository.count();
        long totalDownloads = downloadRepository.count();
        long totalMessages = messageRepository.count();

        List<Visitor> allVisitors = visitorRepository.findAll();
        
        long uniqueVisitors = allVisitors.stream()
                .map(Visitor::getIpHash)
                .distinct()
                .count();

        // Group page views by page path
        Map<String, Long> pageViewsPerPath = allVisitors.stream()
                .collect(Collectors.groupingBy(
                        v -> v.getPagePath() != null ? v.getPagePath() : "/",
                        Collectors.counting()
                ));

        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);

        // Group page views per day for the last 30 days
        List<Visitor> recentVisitors = visitorRepository.findByVisitedAtAfterOrderByVisitedAtDesc(thirtyDaysAgo);
        Map<String, Long> viewsByDate = recentVisitors.stream()
                .collect(Collectors.groupingBy(
                        v -> v.getVisitedAt().toLocalDate().toString(),
                        Collectors.counting()
                ));

        // Group downloads per day for the last 30 days
        List<Download> recentDownloads = downloadRepository.findByDownloadedAtAfterOrderByDownloadedAtDesc(thirtyDaysAgo);
        Map<String, Long> downloadsByDate = recentDownloads.stream()
                .collect(Collectors.groupingBy(
                        d -> d.getDownloadedAt().toLocalDate().toString(),
                        Collectors.counting()
                ));

        // Format dates into sequential lists for charts
        List<Map<String, Object>> viewsPerDayList = new ArrayList<>();
        List<Map<String, Object>> downloadsPerDayList = new ArrayList<>();

        for (int i = 29; i >= 0; i--) {
            String dateStr = LocalDate.now().minusDays(i).toString();
            
            Map<String, Object> viewMap = new HashMap<>();
            viewMap.put("date", dateStr);
            viewMap.put("views", viewsByDate.getOrDefault(dateStr, 0L));
            viewsPerDayList.add(viewMap);

            Map<String, Object> downloadMap = new HashMap<>();
            downloadMap.put("date", dateStr);
            downloadMap.put("downloads", downloadsByDate.getOrDefault(dateStr, 0L));
            downloadsPerDayList.add(downloadMap);
        }

        return AnalyticsSummary.builder()
                .totalPageViews(totalPageViews)
                .uniqueVisitors(uniqueVisitors)
                .totalDownloads(totalDownloads)
                .totalMessages(totalMessages)
                .pageViewsPerPath(pageViewsPerPath)
                .viewsPerDay(viewsPerDayList)
                .downloadsPerDay(downloadsPerDayList)
                .build();
    }
}
