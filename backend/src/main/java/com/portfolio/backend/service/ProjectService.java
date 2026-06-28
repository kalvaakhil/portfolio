package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
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
public class ProjectService {

    private static final Logger log = LoggerFactory.getLogger(ProjectService.class);

    private final ProjectRepository projectRepository;

    @Cacheable(value = "projects")
    @Transactional(readOnly = true)
    public List<Project> getAllProjects() {
        log.debug("Fetching all projects");
        List<Project> projects = projectRepository.findAll();
        log.debug("Fetched {} projects", projects.size());
        return projects;
    }

    @Transactional(readOnly = true)
    public Project getProjectById(Long id) {
        log.debug("Fetching project id={}", id);
        return projectRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Project not found with id: {}", id);
                    return new ResourceNotFoundException("Project not found with id: " + id);
                });
    }

    @CacheEvict(value = "projects", allEntries = true)
    @Transactional
    public Project createProject(Project project) {
        log.info("Creating new project: '{}'", project.getTitle());
        Project saved = projectRepository.save(project);
        log.info("Project created with id={}, title='{}'", saved.getId(), saved.getTitle());
        return saved;
    }

    @CacheEvict(value = "projects", allEntries = true)
    @Transactional
    public Project updateProject(Long id, Project projectDetails) {
        log.info("Updating project id={}", id);
        Project project = getProjectById(id);
        project.setTitle(projectDetails.getTitle());
        project.setDescription(projectDetails.getDescription());
        project.setTechStack(projectDetails.getTechStack());
        project.setGithubUrl(projectDetails.getGithubUrl());
        project.setLiveUrl(projectDetails.getLiveUrl());
        project.setImageUrl(projectDetails.getImageUrl());
        project.setBusinessProblem(projectDetails.getBusinessProblem());
        project.setSolution(projectDetails.getSolution());
        project.setFeatures(projectDetails.getFeatures());
        project.setChallenges(projectDetails.getChallenges());
        project.setLessonsLearned(projectDetails.getLessonsLearned());
        project.setPerformanceOptimizations(projectDetails.getPerformanceOptimizations());
        project.setSecurityFeatures(projectDetails.getSecurityFeatures());
        project.setFutureScope(projectDetails.getFutureScope());
        Project updated = projectRepository.save(project);
        log.info("Project id={} updated successfully", id);
        return updated;
    }

    @CacheEvict(value = "projects", allEntries = true)
    @Transactional
    public void deleteProject(Long id) {
        log.info("Deleting project id={}", id);
        Project project = getProjectById(id);
        projectRepository.delete(project);
        log.info("Project id={} deleted successfully", id);
    }
}
