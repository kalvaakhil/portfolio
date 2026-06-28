package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Skill;
import com.portfolio.backend.repository.SkillRepository;
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
public class SkillService {

    private static final Logger log = LoggerFactory.getLogger(SkillService.class);

    private final SkillRepository skillRepository;

    @Cacheable(value = "skills")
    @Transactional(readOnly = true)
    public List<Skill> getAllSkills() {
        log.debug("Fetching all skills");
        List<Skill> skills = skillRepository.findAll();
        log.debug("Fetched {} skills", skills.size());
        return skills;
    }

    @Transactional(readOnly = true)
    public Skill getSkillById(Long id) {
        log.debug("Fetching skill id={}", id);
        return skillRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Skill not found with id: {}", id);
                    return new ResourceNotFoundException("Skill not found with id: " + id);
                });
    }

    @CacheEvict(value = "skills", allEntries = true)
    @Transactional
    public Skill createSkill(Skill skill) {
        log.info("Creating skill: '{}'", skill.getName());
        Skill saved = skillRepository.save(skill);
        log.info("Skill created with id={}, name='{}'", saved.getId(), saved.getName());
        return saved;
    }

    @CacheEvict(value = "skills", allEntries = true)
    @Transactional
    public Skill updateSkill(Long id, Skill skillDetails) {
        log.info("Updating skill id={}", id);
        Skill skill = getSkillById(id);
        skill.setName(skillDetails.getName());
        skill.setCategory(skillDetails.getCategory());
        skill.setProficiency(skillDetails.getProficiency());
        skill.setLogo(skillDetails.getLogo());
        skill.setExperienceYears(skillDetails.getExperienceYears());
        skill.setProjectsUsed(skillDetails.getProjectsUsed());
        Skill updated = skillRepository.save(skill);
        log.info("Skill id={} updated successfully", id);
        return updated;
    }

    @CacheEvict(value = "skills", allEntries = true)
    @Transactional
    public void deleteSkill(Long id) {
        log.info("Deleting skill id={}", id);
        Skill skill = getSkillById(id);
        skillRepository.delete(skill);
        log.info("Skill id={} deleted successfully", id);
    }
}
