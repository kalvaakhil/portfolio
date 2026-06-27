package com.portfolio.backend.repository;

import com.portfolio.backend.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    List<Visitor> findByVisitedAtAfterOrderByVisitedAtDesc(LocalDateTime dateTime);
}
