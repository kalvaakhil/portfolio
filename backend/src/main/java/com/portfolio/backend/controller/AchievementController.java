package com.portfolio.backend.controller;

import com.portfolio.backend.model.Achievement;
import com.portfolio.backend.service.AchievementService;
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
public class AchievementController {

    private static final Logger log = LoggerFactory.getLogger(AchievementController.class);

    private final AchievementService achievementService;

    @GetMapping("/api/achievements")
    public ResponseEntity<List<Achievement>> getAllAchievements() {
        log.debug("GET /api/achievements");
        return ResponseEntity.ok(achievementService.getAllAchievements());
    }

    @PostMapping("/api/admin/achievements")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Achievement> createAchievement(@RequestBody Achievement achievement) {
        log.info("POST /api/admin/achievements — creating: '{}'", achievement.getTitle());
        return new ResponseEntity<>(achievementService.createAchievement(achievement), HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/achievements/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Achievement> updateAchievement(@PathVariable Long id, @RequestBody Achievement achievement) {
        log.info("PUT /api/admin/achievements/{}", id);
        return ResponseEntity.ok(achievementService.updateAchievement(id, achievement));
    }

    @DeleteMapping("/api/admin/achievements/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAchievement(@PathVariable Long id) {
        log.info("DELETE /api/admin/achievements/{}", id);
        achievementService.deleteAchievement(id);
        return ResponseEntity.noContent().build();
    }
}
