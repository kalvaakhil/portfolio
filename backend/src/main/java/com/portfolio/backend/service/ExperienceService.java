package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Experience;
import com.portfolio.backend.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    @Cacheable(value = "experiences")
    @Transactional(readOnly = true)
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Experience getExperienceById(Long id) {
        return experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));
    }

    @CacheEvict(value = "experiences", allEntries = true)
    @Transactional
    public Experience createExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    @CacheEvict(value = "experiences", allEntries = true)
    @Transactional
    public Experience updateExperience(Long id, Experience details) {
        Experience experience = getExperienceById(id);
        experience.setTitle(details.getTitle());
        experience.setCompany(details.getCompany());
        experience.setLocation(details.getLocation());
        experience.setStartDate(details.getStartDate());
        experience.setEndDate(details.getEndDate());
        experience.setBulletPoints(details.getBulletPoints());
        experience.setTechnologies(details.getTechnologies());
        return experienceRepository.save(experience);
    }

    @CacheEvict(value = "experiences", allEntries = true)
    @Transactional
    public void deleteExperience(Long id) {
        Experience experience = getExperienceById(id);
        experienceRepository.delete(experience);
    }
}
