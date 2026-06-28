package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Experience;
import com.portfolio.backend.repository.ExperienceRepository;
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
public class ExperienceService {

    private static final Logger log = LoggerFactory.getLogger(ExperienceService.class);

    private final ExperienceRepository experienceRepository;

    @Cacheable(value = "experiences")
    @Transactional(readOnly = true)
    public List<Experience> getAllExperiences() {
        log.debug("Fetching all experiences");
        List<Experience> list = experienceRepository.findAll();
        log.debug("Fetched {} experiences", list.size());
        return list;
    }

    @Transactional(readOnly = true)
    public Experience getExperienceById(Long id) {
        log.debug("Fetching experience id={}", id);
        return experienceRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Experience not found with id: {}", id);
                    return new ResourceNotFoundException("Experience not found with id: " + id);
                });
    }

    @CacheEvict(value = "experiences", allEntries = true)
    @Transactional
    public Experience createExperience(Experience experience) {
        log.info("Creating experience: '{}' at '{}'", experience.getTitle(), experience.getCompany());
        Experience saved = experienceRepository.save(experience);
        log.info("Experience created with id={}", saved.getId());
        return saved;
    }

    @CacheEvict(value = "experiences", allEntries = true)
    @Transactional
    public Experience updateExperience(Long id, Experience details) {
        log.info("Updating experience id={}", id);
        Experience experience = getExperienceById(id);
        experience.setTitle(details.getTitle());
        experience.setCompany(details.getCompany());
        experience.setLocation(details.getLocation());
        experience.setStartDate(details.getStartDate());
        experience.setEndDate(details.getEndDate());
        experience.setBulletPoints(details.getBulletPoints());
        experience.setTechnologies(details.getTechnologies());
        Experience updated = experienceRepository.save(experience);
        log.info("Experience id={} updated successfully", id);
        return updated;
    }

    @CacheEvict(value = "experiences", allEntries = true)
    @Transactional
    public void deleteExperience(Long id) {
        log.info("Deleting experience id={}", id);
        Experience experience = getExperienceById(id);
        experienceRepository.delete(experience);
        log.info("Experience id={} deleted successfully", id);
    }
}
