package com.portfolio.backend.controller;

import com.portfolio.backend.model.Education;
import com.portfolio.backend.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EducationController {

    private final EducationService educationService;

    @GetMapping("/api/educations")
    public ResponseEntity<List<Education>> getAllEducations() {
        return ResponseEntity.ok(educationService.getAllEducations());
    }

    @PostMapping("/api/admin/educations")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Education> createEducation(@RequestBody Education education) {
        return new ResponseEntity<>(educationService.createEducation(education), HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/educations/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Education> updateEducation(@PathVariable Long id, @RequestBody Education education) {
        return ResponseEntity.ok(educationService.updateEducation(id, education));
    }

    @DeleteMapping("/api/admin/educations/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }
}
