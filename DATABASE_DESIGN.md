# Database Design Specification

This document details the normalized relational database schemas, columns, types, indexes, and relationships built inside PostgreSQL and H2 databases.

---

## 🗺 Entity Relationship Mapping Summary

```text
  [users] ── (Admin Credentials)
  
  [projects] ──┬── (1:N) ── [project_tech_stack]
               └── (1:N) ── [project_features]
               
  [skills] ──── (1:N) ── [skill_projects]
  
  [experiences] ──┬── (1:N) ── [experience_bullets]
                  └── (1:N) ── [experience_technologies]
                  
  [blogs] ───── (1:N) ── [blog_tags]
  
  [messages] ── (Contact Mail Logs)
  
  [visitors] ── (Telemetry Page View logs)
  
  [downloads] ─ (Resume Download logs)
```

---

## 📋 1. Core Tables Schemas

### Table: `users`
Stores credentials for the administrative console login.
- `id` (BIGINT, Primary Key, Auto-Increment)
- `username` (VARCHAR(255), Unique, Not Null)
- `password` (VARCHAR(255), Not Null) - *BCrypt encrypted*
- `email` (VARCHAR(255), Not Null)
- `role` (VARCHAR(255), Not Null)

### Table: `projects`
Stores high-fidelity technical specs for Akhil's featured projects.
- `id` (BIGINT, Primary Key, Auto-Increment)
- `title` (VARCHAR(255), Not Null)
- `subtitle` (VARCHAR(255))
- `description` (TEXT)
- `business_problem` (TEXT)
- `solution` (TEXT)
- `challenges` (TEXT)
- `lessons_learned` (TEXT)
- `performance_optimizations` (TEXT)
- `security_features` (TEXT)
- `future_scope` (VARCHAR(255))

### Table: `project_tech_stack` (Child Table)
1:N mapping linking tools to projects.
- `project_id` (BIGINT, Foreign Key referencing `projects(id)`)
- `tech` (VARCHAR(255))

### Table: `visitors`
Aggregates telemetry page views.
- `id` (BIGINT, Primary Key, Auto-Increment)
- `ip_hash` (VARCHAR(255)) - *SHA-256 IP representation (Privacy Safe)*
- `user_agent` (VARCHAR(255))
- `page_path` (VARCHAR(255))
- `session_id` (VARCHAR(255))
- `visited_at` (TIMESTAMP)

---

## ⚡️ 2. Query Indexing Optimizations
To support rapid dashboard aggregation and list queries, we define key indexing fields:

1. **IP hash index on `visitors(ip_hash)`**: Speeds up distinct IP counting operations to calculate unique visitor metrics.
2. **Date bounds index on `visitors(visited_at)`**: Optimizes daily traffic group queries for Recharts graphs.
3. **Route index on `visitors(page_path)`**: Accelerates page views path allocation queries.
