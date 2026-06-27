package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Skill;
import com.portfolio.backend.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    @Cacheable(value = "skills")
    @Transactional(readOnly = true)
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Skill getSkillById(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
    }

    @CacheEvict(value = "skills", allEntries = true)
    @Transactional
    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    @CacheEvict(value = "skills", allEntries = true)
    @Transactional
    public Skill updateSkill(Long id, Skill skillDetails) {
        Skill skill = getSkillById(id);
        skill.setName(skillDetails.getName());
        skill.setCategory(skillDetails.getCategory());
        skill.setProficiency(skillDetails.getProficiency());
        skill.setLogo(skillDetails.getLogo());
        skill.setExperienceYears(skillDetails.getExperienceYears());
        skill.setProjectsUsed(skillDetails.getProjectsUsed());
        return skillRepository.save(skill);
    }

    @CacheEvict(value = "skills", allEntries = true)
    @Transactional
    public void deleteSkill(Long id) {
        Skill skill = getSkillById(id);
        skillRepository.delete(skill);
    }
}
