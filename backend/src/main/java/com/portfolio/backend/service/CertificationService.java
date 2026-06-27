package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Certification;
import com.portfolio.backend.repository.CertificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificationService {

    private final CertificationRepository certificationRepository;

    @Cacheable(value = "certifications")
    @Transactional(readOnly = true)
    public List<Certification> getAllCertifications() {
        return certificationRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Certification getCertificationById(Long id) {
        return certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification not found with id: " + id));
    }

    @CacheEvict(value = "certifications", allEntries = true)
    @Transactional
    public Certification createCertification(Certification certification) {
        return certificationRepository.save(certification);
    }

    @CacheEvict(value = "certifications", allEntries = true)
    @Transactional
    public Certification updateCertification(Long id, Certification details) {
        Certification certification = getCertificationById(id);
        certification.setName(details.getName());
        certification.setIssuer(details.getIssuer());
        certification.setIssueDate(details.getIssueDate());
        certification.setCredentialUrl(details.getCredentialUrl());
        certification.setCredentialId(details.getCredentialId());
        return certificationRepository.save(certification);
    }

    @CacheEvict(value = "certifications", allEntries = true)
    @Transactional
    public void deleteCertification(Long id) {
        Certification certification = getCertificationById(id);
        certificationRepository.delete(certification);
    }
}
