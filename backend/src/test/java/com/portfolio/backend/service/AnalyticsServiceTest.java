package com.portfolio.backend.service;

import com.portfolio.backend.dto.AnalyticsSummary;
import com.portfolio.backend.model.Download;
import com.portfolio.backend.model.Visitor;
import com.portfolio.backend.repository.DownloadRepository;
import com.portfolio.backend.repository.MessageRepository;
import com.portfolio.backend.repository.VisitorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AnalyticsServiceTest {

    @Mock
    private VisitorRepository visitorRepository;

    @Mock
    private DownloadRepository downloadRepository;

    @Mock
    private MessageRepository messageRepository;

    @InjectMocks
    private AnalyticsService analyticsService;

    private Visitor sampleVisitor;
    private Download sampleDownload;

    @BeforeEach
    void setUp() {
        sampleVisitor = Visitor.builder()
                .id(1L)
                .ipHash("a1b2c3d4")
                .userAgent("Mozilla/5.0")
                .pagePath("/projects")
                .sessionId("sess_123")
                .visitedAt(LocalDateTime.now())
                .build();

        sampleDownload = Download.builder()
                .id(1L)
                .ipHash("a1b2c3d4")
                .fileType("PDF_RESUME")
                .downloadedAt(LocalDateTime.now())
                .build();
    }

    @Test
    void testTrackVisitor_Success_MasksIpHash() {
        ArgumentCaptor<Visitor> visitorCaptor = ArgumentCaptor.forClass(Visitor.class);
        when(visitorRepository.save(any(Visitor.class))).thenReturn(sampleVisitor);

        analyticsService.trackVisitor("192.168.1.100", "Mozilla/5.0", "/projects", "sess_123");

        verify(visitorRepository, times(1)).save(visitorCaptor.capture());
        Visitor saved = visitorCaptor.getValue();
        
        assertNotNull(saved);
        assertEquals("/projects", saved.getPagePath());
        assertEquals("sess_123", saved.getSessionId());
        // Verify IP address was hashed and shortened (not cleartext)
        assertNotEquals("192.168.1.100", saved.getIpHash());
        assertEquals(16, saved.getIpHash().length());
    }

    @Test
    void testTrackDownload_Success() {
        ArgumentCaptor<Download> downloadCaptor = ArgumentCaptor.forClass(Download.class);
        when(downloadRepository.save(any(Download.class))).thenReturn(sampleDownload);

        analyticsService.trackDownload("192.168.1.100", "PDF_RESUME");

        verify(downloadRepository, times(1)).save(downloadCaptor.capture());
        Download saved = downloadCaptor.getValue();
        
        assertNotNull(saved);
        assertEquals("PDF_RESUME", saved.getFileType());
        assertNotEquals("192.168.1.100", saved.getIpHash());
    }

    @Test
    void testGetSummary_AggregatesCorrectly() {
        // Mock numerical counts
        when(visitorRepository.count()).thenReturn(10L);
        when(downloadRepository.count()).thenReturn(3L);
        when(messageRepository.count()).thenReturn(2L);

        // Mock list records
        Visitor v1 = Visitor.builder().ipHash("hash1").pagePath("/").visitedAt(LocalDateTime.now()).build();
        Visitor v2 = Visitor.builder().ipHash("hash1").pagePath("/projects").visitedAt(LocalDateTime.now()).build();
        Visitor v3 = Visitor.builder().ipHash("hash2").pagePath("/").visitedAt(LocalDateTime.now()).build();
        
        when(visitorRepository.findAll()).thenReturn(Arrays.asList(v1, v2, v3));
        when(visitorRepository.findByVisitedAtAfterOrderByVisitedAtDesc(any(LocalDateTime.class))).thenReturn(Arrays.asList(v1, v2, v3));
        when(downloadRepository.findByDownloadedAtAfterOrderByDownloadedAtDesc(any(LocalDateTime.class))).thenReturn(Collections.singletonList(sampleDownload));

        AnalyticsSummary summary = analyticsService.getSummary();

        assertNotNull(summary);
        assertEquals(10L, summary.getTotalPageViews());
        assertEquals(3L, summary.getTotalDownloads());
        assertEquals(2L, summary.getTotalMessages());
        
        // Assert Unique Visitors count (2 unique hashes: hash1, hash2)
        assertEquals(2L, summary.getUniqueVisitors());
        
        // Assert path page views (2 views for "/", 1 view for "/projects")
        assertEquals(2L, summary.getPageViewsPerPath().get("/"));
        assertEquals(1L, summary.getPageViewsPerPath().get("/projects"));

        // Assert 30 days lists are generated
        assertEquals(30, summary.getViewsPerDay().size());
        assertEquals(30, summary.getDownloadsPerDay().size());
    }
}
