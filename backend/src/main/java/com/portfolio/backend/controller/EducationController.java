package com.portfolio.backend.controller;

import com.portfolio.backend.model.Education;
import com.portfolio.backend.service.EducationService;
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
public class EducationController {

    private static final Logger log = LoggerFactory.getLogger(EducationController.class);

    private final EducationService educationService;

    @GetMapping("/api/educations")
    public ResponseEntity<List<Education>> getAllEducations() {
        log.debug("GET /api/educations");
        return ResponseEntity.ok(educationService.getAllEducations());
    }

    @PostMapping("/api/admin/educations")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Education> createEducation(@RequestBody Education education) {
        log.info("POST /api/admin/educations — creating: '{}'", education.getSchool());
        return new ResponseEntity<>(educationService.createEducation(education), HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/educations/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Education> updateEducation(@PathVariable Long id, @RequestBody Education education) {
        log.info("PUT /api/admin/educations/{}", id);
        return ResponseEntity.ok(educationService.updateEducation(id, education));
    }

    @DeleteMapping("/api/admin/educations/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        log.info("DELETE /api/admin/educations/{}", id);
        educationService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }
}
