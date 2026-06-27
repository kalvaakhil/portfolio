package com.portfolio.backend.repository;

import com.portfolio.backend.model.Download;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface DownloadRepository extends JpaRepository<Download, Long> {
    List<Download> findByDownloadedAtAfterOrderByDownloadedAtDesc(LocalDateTime dateTime);
}
