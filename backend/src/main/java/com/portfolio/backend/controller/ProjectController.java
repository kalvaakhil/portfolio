package com.portfolio.backend.controller;

import com.portfolio.backend.model.Project;
import com.portfolio.backend.service.ProjectService;
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
public class ProjectController {

    private static final Logger log = LoggerFactory.getLogger(ProjectController.class);

    private final ProjectService projectService;

    @GetMapping("/api/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        log.debug("GET /api/projects");
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/api/projects/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        log.debug("GET /api/projects/{}", id);
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping("/api/admin/projects")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        log.info("POST /api/admin/projects — creating project: '{}'", project.getTitle());
        return new ResponseEntity<>(projectService.createProject(project), HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/projects/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project) {
        log.info("PUT /api/admin/projects/{}", id);
        return ResponseEntity.ok(projectService.updateProject(id, project));
    }

    @DeleteMapping("/api/admin/projects/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        log.info("DELETE /api/admin/projects/{}", id);
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
