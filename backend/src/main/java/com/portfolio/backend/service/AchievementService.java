package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Achievement;
import com.portfolio.backend.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository achievementRepository;

    @Cacheable(value = "achievements")
    @Transactional(readOnly = true)
    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Achievement getAchievementById(Long id) {
        return achievementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + id));
    }

    @CacheEvict(value = "achievements", allEntries = true)
    @Transactional
    public Achievement createAchievement(Achievement achievement) {
        return achievementRepository.save(achievement);
    }

    @CacheEvict(value = "achievements", allEntries = true)
    @Transactional
    public Achievement updateAchievement(Long id, Achievement details) {
        Achievement achievement = getAchievementById(id);
        achievement.setTitle(details.getTitle());
        achievement.setDescription(details.getDescription());
        achievement.setDateAchieved(details.getDateAchieved());
        return achievementRepository.save(achievement);
    }

    @CacheEvict(value = "achievements", allEntries = true)
    @Transactional
    public void deleteAchievement(Long id) {
        Achievement achievement = getAchievementById(id);
        achievementRepository.delete(achievement);
    }
}
