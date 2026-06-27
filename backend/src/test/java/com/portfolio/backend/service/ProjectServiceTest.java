package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    private Project sampleProject;

    @BeforeEach
    void setUp() {
        sampleProject = Project.builder()
                .id(1L)
                .title("E-Commerce Platform")
                .description("Microservices commerce backend")
                .techStack(Arrays.asList("Java", "Spring Boot"))
                .githubUrl("https://github.com")
                .liveUrl("https://live.com")
                .build();
    }

    @Test
    void testGetAllProjects_Success() {
        when(projectRepository.findAll()).thenReturn(Arrays.asList(sampleProject));

        List<Project> result = projectService.getAllProjects();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("E-Commerce Platform", result.get(0).getTitle());
        verify(projectRepository, times(1)).findAll();
    }

    @Test
    void testGetProjectById_Success() {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(sampleProject));

        Project result = projectService.getProjectById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("E-Commerce Platform", result.getTitle());
    }

    @Test
    void testGetProjectById_NotFound_ThrowsException() {
        when(projectRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> projectService.getProjectById(99L));
    }

    @Test
    void testCreateProject_Success() {
        when(projectRepository.save(any(Project.class))).thenReturn(sampleProject);

        Project result = projectService.createProject(sampleProject);

        assertNotNull(result);
        assertEquals("E-Commerce Platform", result.getTitle());
        verify(projectRepository, times(1)).save(sampleProject);
    }

    @Test
    void testUpdateProject_Success() {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(sampleProject));
        when(projectRepository.save(any(Project.class))).thenReturn(sampleProject);

        Project updatedDetails = Project.builder()
                .title("Updated Title")
                .description("Updated description")
                .build();

        Project result = projectService.updateProject(1L, updatedDetails);

        assertNotNull(result);
        assertEquals("Updated Title", result.getTitle());
        verify(projectRepository, times(1)).save(any(Project.class));
    }

    @Test
    void testDeleteProject_Success() {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(sampleProject));
        doNothing().when(projectRepository).delete(sampleProject);

        projectService.deleteProject(1L);

        verify(projectRepository, times(1)).delete(sampleProject);
    }
}
