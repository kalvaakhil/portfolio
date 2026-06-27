package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Education;
import com.portfolio.backend.repository.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationService {

    private final EducationRepository educationRepository;

    @Cacheable(value = "educations")
    @Transactional(readOnly = true)
    public List<Education> getAllEducations() {
        return educationRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Education getEducationById(Long id) {
        return educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found with id: " + id));
    }

    @CacheEvict(value = "educations", allEntries = true)
    @Transactional
    public Education createEducation(Education education) {
        return educationRepository.save(education);
    }

    @CacheEvict(value = "educations", allEntries = true)
    @Transactional
    public Education updateEducation(Long id, Education details) {
        Education education = getEducationById(id);
        education.setDegree(details.getDegree());
        education.setFieldOfStudy(details.getFieldOfStudy());
        education.setSchool(details.getSchool());
        education.setCgpa(details.getCgpa());
        education.setStartYear(details.getStartYear());
        education.setEndYear(details.getEndYear());
        return educationRepository.save(education);
    }

    @CacheEvict(value = "educations", allEntries = true)
    @Transactional
    public void deleteEducation(Long id) {
        Education education = getEducationById(id);
        educationRepository.delete(education);
    }
}
