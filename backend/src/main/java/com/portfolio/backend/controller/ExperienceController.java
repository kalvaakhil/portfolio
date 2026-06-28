package com.portfolio.backend.controller;

import com.portfolio.backend.model.Experience;
import com.portfolio.backend.service.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ExperienceController {

    private static final Logger log = LoggerFactory.getLogger(ExperienceController.class);

    private final ExperienceService experienceService;

    @GetMapping("/api/experiences")
    public ResponseEntity<List<Experience>> getAllExperiences() {
        log.debug("GET /api/experiences");
        return ResponseEntity.ok(experienceService.getAllExperiences());
    }

    @PostMapping("/api/admin/experiences")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Experience> createExperience(@RequestBody Experience experience) {
        log.info("POST /api/admin/experiences — creating: '{}' at '{}'", experience.getTitle(), experience.getCompany());
        return new ResponseEntity<>(experienceService.createExperience(experience), HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/experiences/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @RequestBody Experience experience) {
        log.info("PUT /api/admin/experiences/{}", id);
        return ResponseEntity.ok(experienceService.updateExperience(id, experience));
    }

    @DeleteMapping("/api/admin/experiences/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        log.info("DELETE /api/admin/experiences/{}", id);
        experienceService.deleteExperience(id);
        return ResponseEntity.noContent().build();
    }
}
