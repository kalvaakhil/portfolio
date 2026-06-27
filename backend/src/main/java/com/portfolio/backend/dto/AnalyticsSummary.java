package com.portfolio.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsSummary {
    private long totalPageViews;
    private long uniqueVisitors;
    private long totalDownloads;
    private long totalMessages;
    
    private Map<String, Long> pageViewsPerPath;
    private List<Map<String, Object>> viewsPerDay;
    private List<Map<String, Object>> downloadsPerDay;
}
