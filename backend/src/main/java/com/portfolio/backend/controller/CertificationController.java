package com.portfolio.backend.controller;

import com.portfolio.backend.model.Certification;
import com.portfolio.backend.service.CertificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CertificationController {

    private final CertificationService certificationService;

    @GetMapping("/api/certifications")
    public ResponseEntity<List<Certification>> getAllCertifications() {
        return ResponseEntity.ok(certificationService.getAllCertifications());
    }

    @PostMapping("/api/admin/certifications")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Certification> createCertification(@RequestBody Certification certification) {
        return new ResponseEntity<>(certificationService.createCertification(certification), HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/certifications/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Certification> updateCertification(@PathVariable Long id, @RequestBody Certification certification) {
        return ResponseEntity.ok(certificationService.updateCertification(id, certification));
    }

    @DeleteMapping("/api/admin/certifications/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {
        certificationService.deleteCertification(id);
        return ResponseEntity.noContent().build();
    }
}
