package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Cacheable(value = "projects")
    @Transactional(readOnly = true)
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
    }

    @CacheEvict(value = "projects", allEntries = true)
    @Transactional
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    @CacheEvict(value = "projects", allEntries = true)
    @Transactional
    public Project updateProject(Long id, Project projectDetails) {
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
        return projectRepository.save(project);
    }

    @CacheEvict(value = "projects", allEntries = true)
    @Transactional
    public void deleteProject(Long id) {
        Project project = getProjectById(id);
        projectRepository.delete(project);
    }
}
