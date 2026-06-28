package com.portfolio.backend.controller;

import com.portfolio.backend.model.Skill;
import com.portfolio.backend.service.SkillService;
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
public class SkillController {

    private static final Logger log = LoggerFactory.getLogger(SkillController.class);

    private final SkillService skillService;

    @GetMapping("/api/skills")
    public ResponseEntity<List<Skill>> getAllSkills() {
        log.debug("GET /api/skills");
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @PostMapping("/api/admin/skills")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        log.info("POST /api/admin/skills — creating skill: '{}'", skill.getName());
        return new ResponseEntity<>(skillService.createSkill(skill), HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/skills/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @RequestBody Skill skill) {
        log.info("PUT /api/admin/skills/{}", id);
        return ResponseEntity.ok(skillService.updateSkill(id, skill));
    }

    @DeleteMapping("/api/admin/skills/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        log.info("DELETE /api/admin/skills/{}", id);
        skillService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
}
