package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "skills")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // e.g., Backend, Frontend, Cloud, DevOps, Architecture

    private int proficiency; // 0 to 100

    private String logo; // Icon key/name (e.g. "java", "spring-boot", "react")

    private int experienceYears;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "skill_projects", joinColumns = @JoinColumn(name = "skill_id"))
    @Column(name = "project_name")
    private List<String> projectsUsed;
}
