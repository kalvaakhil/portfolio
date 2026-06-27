package com.portfolio.backend.repository;

import com.portfolio.backend.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository extends JpaRepository<Education, Long> {
}
