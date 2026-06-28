package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Education;
import com.portfolio.backend.repository.EducationRepository;
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
public class EducationService {

    private static final Logger log = LoggerFactory.getLogger(EducationService.class);

    private final EducationRepository educationRepository;

    @Cacheable(value = "educations")
    @Transactional(readOnly = true)
    public List<Education> getAllEducations() {
        log.debug("Fetching all educations");
        List<Education> educations = educationRepository.findAll();
        log.debug("Fetched {} educations", educations.size());
        return educations;
    }

    @Transactional(readOnly = true)
    public Education getEducationById(Long id) {
        log.debug("Fetching education id={}", id);
        return educationRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Education not found with id: {}", id);
                    return new ResourceNotFoundException("Education not found with id: " + id);
                });
    }

    @CacheEvict(value = "educations", allEntries = true)
    @Transactional
    public Education createEducation(Education education) {
        log.info("Creating new education entry: {} - {}", education.getDegree(), education.getSchool());
        Education saved = educationRepository.save(education);
        log.info("Education entry created with id={}", saved.getId());
        return saved;
    }

    @CacheEvict(value = "educations", allEntries = true)
    @Transactional
    public Education updateEducation(Long id, Education details) {
        log.info("Updating education id={}", id);
        Education education = getEducationById(id);
        education.setDegree(details.getDegree());
        education.setFieldOfStudy(details.getFieldOfStudy());
        education.setSchool(details.getSchool());
        education.setCgpa(details.getCgpa());
        education.setStartYear(details.getStartYear());
        education.setEndYear(details.getEndYear());
        Education updated = educationRepository.save(education);
        log.info("Education id={} updated successfully", id);
        return updated;
    }

    @CacheEvict(value = "educations", allEntries = true)
    @Transactional
    public void deleteEducation(Long id) {
        log.info("Deleting education id={}", id);
        Education education = getEducationById(id);
        educationRepository.delete(education);
        log.info("Education id={} deleted successfully", id);
    }
}
