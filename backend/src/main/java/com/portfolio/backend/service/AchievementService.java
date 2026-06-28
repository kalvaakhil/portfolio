package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Achievement;
import com.portfolio.backend.repository.AchievementRepository;
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
public class AchievementService {

    private static final Logger log = LoggerFactory.getLogger(AchievementService.class);

    private final AchievementRepository achievementRepository;

    @Cacheable(value = "achievements")
    @Transactional(readOnly = true)
    public List<Achievement> getAllAchievements() {
        log.debug("Fetching all achievements");
        List<Achievement> achievements = achievementRepository.findAll();
        log.debug("Fetched {} achievements", achievements.size());
        return achievements;
    }

    @Transactional(readOnly = true)
    public Achievement getAchievementById(Long id) {
        log.debug("Fetching achievement id={}", id);
        return achievementRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Achievement not found with id: {}", id);
                    return new ResourceNotFoundException("Achievement not found with id: " + id);
                });
    }

    @CacheEvict(value = "achievements", allEntries = true)
    @Transactional
    public Achievement createAchievement(Achievement achievement) {
        log.info("Creating new achievement: '{}'", achievement.getTitle());
        Achievement saved = achievementRepository.save(achievement);
        log.info("Achievement created with id={}", saved.getId());
        return saved;
    }

    @CacheEvict(value = "achievements", allEntries = true)
    @Transactional
    public Achievement updateAchievement(Long id, Achievement details) {
        log.info("Updating achievement id={}", id);
        Achievement achievement = getAchievementById(id);
        achievement.setTitle(details.getTitle());
        achievement.setDescription(details.getDescription());
        achievement.setDateAchieved(details.getDateAchieved());
        Achievement updated = achievementRepository.save(achievement);
        log.info("Achievement id={} updated successfully", id);
        return updated;
    }

    @CacheEvict(value = "achievements", allEntries = true)
    @Transactional
    public void deleteAchievement(Long id) {
        log.info("Deleting achievement id={}", id);
        Achievement achievement = getAchievementById(id);
        achievementRepository.delete(achievement);
        log.info("Achievement id={} deleted successfully", id);
    }
}
