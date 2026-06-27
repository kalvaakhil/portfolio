# Software Architecture Specification

This document details the software architecture patterns, layers, and operational diagrams governing the portfolio application.

---

## 🏗 System Architecture Topology

The application uses a decoupled client-server architecture. The frontend serves static assets compiled via Vite, communicating with the Spring Boot API server using stateless HTTP REST endpoints.

```mermaid
graph TD
    Client[React Frontend]
    subgraph Spring Boot Backend (Port 8080)
        Gateway[WebSecurity Filter Chain]
        JWTFilter[JwtAuthenticationFilter]
        Controllers[REST Controllers]
        Services[Business Logic Layer]
        Cache[Caching Tier - Redis / In-Memory Fallback]
        DB[(H2 Database / Neon Postgres)]
    end

    Client -->|HTTP Requests + Authorization Header| Gateway
    Gateway --> JWTFilter
    JWTFilter -->|Authorize Session| Controllers
    Controllers --> Services
    Services --> Cache
    Services --> DB
    Services -->|Logs / Telemetry| DB
```

---

## 📂 Software Layering Specifications

### 1. Data Representation Layer (JPA Entities)
Located in `com.portfolio.backend.model`. Includes tables with JPA mapping annotations for skills, experiences, projects, visitor logs, and blog posts. All updates are handled dynamically by Hibernate.

### 2. Data Persistence Layer (JPA Repositories)
Located in `com.portfolio.backend.repository`. Extends standard `JpaRepository` objects, providing fast database querying with custom query mappings.

### 3. Business Service Layer
Located in `com.portfolio.backend.service`. Orchestrates operations:
- Caching logic (using Spring Cache annotations).
- Asymmetric JWT token calculations.
- Privacy-safe IP hashing algorithms.
- Dispatching email alerts to Akhil.

### 4. Controller Layer (REST Controllers)
Located in `com.portfolio.backend.controller`. Exposes endpoints:
- Open paths for catalog data retrieval.
- Telemetry POST paths to track views.
- Secure `/api/admin/**` CRUD pathways protected by JWT security contexts.

---

## 🔒 Security Architecture Model

Our security boundary uses **Spring Security 6.x** in a stateless token configuration:

1. **Edge Filter Interception**: The `JwtAuthenticationFilter` intercepts requests. If an `Authorization: Bearer <JWT>` header is present, it parses and validates it.
2. **Asymmetric signature mapping**: Token signatures are verified using SHA-256 keys. If valid, the security context is populated with the user details.
3. **Graceful Error Responses**: If a token is expired or invalid, custom exception handlers (`CustomAuthenticationEntryPoint` and `CustomAccessDeniedHandler`) return structured JSON error bodies, avoiding default 403 overrides that mask internal faults.
