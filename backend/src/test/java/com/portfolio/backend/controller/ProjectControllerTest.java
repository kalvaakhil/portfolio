package com.portfolio.backend.controller;

import com.portfolio.backend.model.Project;
import com.portfolio.backend.service.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
public class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProjectService projectService;

    private Project mockProject;

    @BeforeEach
    public void setup() {
        mockProject = Project.builder()
                .id(1L)
                .title("Enterprise Microservices E-Commerce Platform")
                .description("High-scale distributed solutions")
                .techStack(Arrays.asList("Spring Boot", "React", "PostgreSQL"))
                .githubUrl("https://github.com/kalvaakhil/Web-Dev")
                .liveUrl("https://shopping-app.akhilkalva.dev")
                .build();
    }

    @Test
    public void testGetAllProjects_Success() throws Exception {
        Mockito.when(projectService.getAllProjects()).thenReturn(Collections.singletonList(mockProject));

        mockMvc.perform(get("/api/projects")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title", is("Enterprise Microservices E-Commerce Platform")))
                .andExpect(jsonPath("$[0].githubUrl", is("https://github.com/kalvaakhil/Web-Dev")));
    }

    @Test
    public void testGetProjectById_Success() throws Exception {
        Mockito.when(projectService.getProjectById(1L)).thenReturn(mockProject);

        mockMvc.perform(get("/api/projects/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Enterprise Microservices E-Commerce Platform")))
                .andExpect(jsonPath("$.liveUrl", is("https://shopping-app.akhilkalva.dev")));
    }

    @Test
    public void testCreateProject_UnauthorizedWithoutAdminRole() throws Exception {
        mockMvc.perform(post("/api/admin/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"New Project\",\"description\":\"Fails security\"}"))
                .andExpect(status().isUnauthorized()); // No user auth context provided
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    public void testCreateProject_AuthorizedWithAdminRole() throws Exception {
        Project newProject = Project.builder().title("Admin Project").description("Succeeds security").build();
        Mockito.when(projectService.createProject(Mockito.any(Project.class))).thenReturn(newProject);

        mockMvc.perform(post("/api/admin/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Admin Project\",\"description\":\"Succeeds security\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title", is("Admin Project")))
                .andExpect(jsonPath("$.description", is("Succeeds security")));
    }
}
