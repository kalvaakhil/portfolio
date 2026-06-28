package com.portfolio.backend.controller;

import com.portfolio.backend.model.Certification;
import com.portfolio.backend.service.CertificationService;
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
public class CertificationController {

    private static final Logger log = LoggerFactory.getLogger(CertificationController.class);

    private final CertificationService certificationService;

    @GetMapping("/api/certifications")
    public ResponseEntity<List<Certification>> getAllCertifications() {
        log.debug("GET /api/certifications");
        return ResponseEntity.ok(certificationService.getAllCertifications());
    }

    @PostMapping("/api/admin/certifications")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Certification> createCertification(@RequestBody Certification certification) {
        log.info("POST /api/admin/certifications — creating: '{}'", certification.getName());
        return new ResponseEntity<>(certificationService.createCertification(certification), HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/certifications/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Certification> updateCertification(@PathVariable Long id, @RequestBody Certification certification) {
        log.info("PUT /api/admin/certifications/{}", id);
        return ResponseEntity.ok(certificationService.updateCertification(id, certification));
    }

    @DeleteMapping("/api/admin/certifications/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {
        log.info("DELETE /api/admin/certifications/{}", id);
        certificationService.deleteCertification(id);
        return ResponseEntity.noContent().build();
    }
}
