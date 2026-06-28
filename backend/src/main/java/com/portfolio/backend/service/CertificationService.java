package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Certification;
import com.portfolio.backend.repository.CertificationRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificationService {

    private static final Logger log = LoggerFactory.getLogger(CertificationService.class);

    private final CertificationRepository certificationRepository;

    @Cacheable(value = "certifications")
    @Transactional(readOnly = true)
    public List<Certification> getAllCertifications() {
        log.debug("Fetching all certifications");
        List<Certification> certifications = certificationRepository.findAll();
        log.debug("Fetched {} certifications", certifications.size());
        return certifications;
    }

    @Transactional(readOnly = true)
    public Certification getCertificationById(Long id) {
        log.debug("Fetching certification id={}", id);
        return certificationRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Certification not found with id: {}", id);
                    return new ResourceNotFoundException("Certification not found with id: " + id);
                });
    }

    @CacheEvict(value = "certifications", allEntries = true)
    @Transactional
    public Certification createCertification(Certification certification) {
        log.info("Creating new certification: '{}' from '{}'", certification.getName(), certification.getIssuer());
        Certification saved = certificationRepository.save(certification);
        log.info("Certification created with id={}", saved.getId());
        return saved;
    }

    @CacheEvict(value = "certifications", allEntries = true)
    @Transactional
    public Certification updateCertification(Long id, Certification details) {
        log.info("Updating certification id={}", id);
        Certification certification = getCertificationById(id);
        certification.setName(details.getName());
        certification.setIssuer(details.getIssuer());
        certification.setIssueDate(details.getIssueDate());
        certification.setCredentialUrl(details.getCredentialUrl());
        certification.setCredentialId(details.getCredentialId());
        Certification updated = certificationRepository.save(certification);
        log.info("Certification id={} updated successfully", id);
        return updated;
    }

    @CacheEvict(value = "certifications", allEntries = true)
    @Transactional
    public void deleteCertification(Long id) {
        log.info("Deleting certification id={}", id);
        Certification certification = getCertificationById(id);
        certificationRepository.delete(certification);
        log.info("Certification id={} deleted successfully", id);
    }
}
