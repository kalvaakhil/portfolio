package com.portfolio.backend.config;

import com.portfolio.backend.model.*;
import com.portfolio.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final BlogRepository blogRepository;
    private final CertificationRepository certificationRepository;
    private final AchievementRepository achievementRepository;
    private final TestimonialRepository testimonialRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            seedAdminUser();
            seedSkills();
            seedExperiences();
            seedEducation();
            seedProjects();
            seedCertificationsAndAchievements();
            seedTestimonials();
            seedBlogs();
            System.out.println("Seeding completed successfully.");
        }
    }

    private void seedAdminUser() {
        User admin = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("password123"))
                .email("kalvaakhil.work@gmail.com")
                .role("ROLE_ADMIN")
                .build();
        userRepository.save(admin);
    }

    private void seedSkills() {
        // Backend
        skillRepository.save(Skill.builder().name("Java").category("Backend").proficiency(95).logo("java").experienceYears(3).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management", "AI Job Search Automation")).build());
        skillRepository.save(Skill.builder().name("Spring Boot").category("Backend").proficiency(92).logo("spring-boot").experienceYears(2).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management", "AI Job Search Automation")).build());
        skillRepository.save(Skill.builder().name("Spring Cloud & Microservices").category("Backend").proficiency(88).logo("spring-cloud").experienceYears(2).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management")).build());
        skillRepository.save(Skill.builder().name("Spring Security & OAuth2").category("Backend").proficiency(85).logo("spring-security").experienceYears(2).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management")).build());
        skillRepository.save(Skill.builder().name("Apache Kafka").category("Backend").proficiency(80).logo("kafka").experienceYears(1).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management")).build());
        skillRepository.save(Skill.builder().name("Redis").category("Backend").proficiency(82).logo("redis").experienceYears(2).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management")).build());
        skillRepository.save(Skill.builder().name("PostgreSQL").category("Databases").proficiency(90).logo("postgresql").experienceYears(3).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management", "AI Job Search Automation")).build());
        skillRepository.save(Skill.builder().name("MySQL").category("Databases").proficiency(90).logo("mysql").experienceYears(3).projectsUsed(Collections.singletonList("Railway Management System")).build());
        
        // Frontend
        skillRepository.save(Skill.builder().name("React").category("Frontend").proficiency(85).logo("react").experienceYears(2).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management", "AI Job Search Automation")).build());
        skillRepository.save(Skill.builder().name("TypeScript").category("Frontend").proficiency(80).logo("typescript").experienceYears(2).projectsUsed(Arrays.asList("FinFlow Wealth Management")).build());
        skillRepository.save(Skill.builder().name("Tailwind CSS").category("Frontend").proficiency(90).logo("tailwind").experienceYears(2).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management", "AI Job Search Automation")).build());
        skillRepository.save(Skill.builder().name("Material UI").category("Frontend").proficiency(82).logo("mui").experienceYears(1).projectsUsed(Collections.singletonList("E-Commerce Platform")).build());

        // Cloud & DevOps
        skillRepository.save(Skill.builder().name("AWS (EC2, S3, CloudWatch)").category("Cloud").proficiency(80).logo("aws").experienceYears(2).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management")).build());
        skillRepository.save(Skill.builder().name("Docker").category("DevOps").proficiency(85).logo("docker").experienceYears(2).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management")).build());
        skillRepository.save(Skill.builder().name("GitHub Actions").category("DevOps").proficiency(78).logo("github-actions").experienceYears(1).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management")).build());
        
        // Architecture & Testing
        skillRepository.save(Skill.builder().name("Distributed Systems").category("Architecture").proficiency(85).logo("architecture").experienceYears(2).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management")).build());
        skillRepository.save(Skill.builder().name("JUnit & Mockito").category("Testing").proficiency(85).logo("junit").experienceYears(2).projectsUsed(Arrays.asList("E-Commerce Platform", "FinFlow Wealth Management")).build());
    }

    private void seedExperiences() {
        experienceRepository.save(Experience.builder()
                .title("Java Full Stack Developer")
                .company("Enterprise Tech Solutions")
                .location("Hyderabad, India")
                .startDate("June 2024")
                .endDate("Present")
                .bulletPoints(Arrays.asList(
                        "Architected and implemented enterprise microservices using Spring Boot, Spring Cloud Eureka, and Spring API Gateway, optimizing service resolution times by 35%.",
                        "Designed and integrated Kafka event brokers to drive asynchronous email alerts and billing updates, reducing service coupling.",
                        "Built premium dashboards in React, using TanStack Query, Framer Motion, and Tailwind CSS, resulting in a 40% enhancement in user retention.",
                        "Introduced Redis caching layer with event-driven invalidation models, reducing backend read latency for reports from 800ms to 45ms.",
                        "Collaborated in CI/CD pipeline structures utilizing GitHub Actions and Docker, reducing build-to-deploy lead cycles by 25%."
                ))
                .technologies(Arrays.asList("Java", "Spring Boot", "Spring Cloud", "Kafka", "Redis", "React", "Docker", "PostgreSQL"))
                .build());

        experienceRepository.save(Experience.builder()
                .title("Software Engineer Intern")
                .company("Core Solutions Corp")
                .location("Chennai, India")
                .startDate("December 2023")
                .endDate("May 2024")
                .bulletPoints(Arrays.asList(
                        "Developed RESTful controller endpoints using Spring MVC and Hibernate JPA to handle user profiles and role configurations.",
                        "Implemented JWT authentication filters and security entry handlers, resolving key token-parsing vulnerabilities.",
                        "Wrote 80+ backend integration and unit tests using JUnit 5 and Mockito, raising code coverage by 18%."
                ))
                .technologies(Arrays.asList("Java", "Spring Boot", "Spring MVC", "Hibernate", "MySQL", "JUnit", "Mockito"))
                .build());
    }

    private void seedEducation() {
        educationRepository.save(Education.builder()
                .degree("Bachelor of Engineering")
                .fieldOfStudy("Computer Science and Engineering")
                .school("Sathyabama Institute of Science and Technology")
                .cgpa("9.45 / 10")
                .startYear("2020")
                .endYear("2024")
                .build());
    }

    private void seedProjects() {
        projectRepository.save(Project.builder()
                .title("Enterprise Microservices E-Commerce Platform")
                .description("A high-scale distributed e-commerce solution consisting of 7 distinct Spring Boot microservices integrated with an API gateway, discovery registry, event bus, and a responsive React client interface.")
                .techStack(Arrays.asList("Spring Boot", "React", "PostgreSQL", "Redis", "Kafka", "Docker", "AWS", "JWT", "Eureka"))
                .githubUrl("https://github.com/kalvaakhil/Web-Dev/tree/main/ShoppingApp")
                .liveUrl("https://shopping-app.akhilkalva.dev")
                .imageUrl("/assets/projects/ecommerce.png")
                .businessProblem("Traditional monolithic retail systems suffer from hard service dependencies, fragile release cycles, and database performance bottlenecks under promotional peak loads (like flash sales).")
                .solution("Deconstructed the monolithic flow into independent domains: Products, Inventory, Orders, Payments, Shipping, Reviews, and Notifications. Each service maintains its own isolated database schema. Eureka and Spring Cloud Gateway routing handle service traffic with load balancing, while Kafka aggregates analytics asynchronously to prevent main checkout thread blockages.")
                .features(Arrays.asList(
                        "Distributed Authentication: Edge JWT verification checks tokens once and attaches trusted identity headers to downstream paths.",
                        "Synchronous Fallbacks: Feign Clients connect Order checks to Inventory with Resilience4j circuit breakers returning graceful fallbacks.",
                        "Transactional Inbox Pattern: Guarantees payment success notification releases checkout events to Kafka topic streams.",
                        "Real-time Stocks updates: Dynamic inventory tracking with atomic database updates prevents overselling."
                ))
                .challenges("Integrating distributed checkout states. When a payment succeeded but notifications crashed, users experienced silent order failure.")
                .lessonsLearned("Implemented transactional event-outbox patterns. Orders are saved alongside checkout events in the same DB transaction, then a background worker polls and dispatches to Kafka, ensuring ultimate consistency.")
                .performanceOptimizations("Redis caching of popular catalog APIs cut average load times by 75%. Read queries bypass Hibernate database calls entirely on cache hits.")
                .securityFeatures("Asymmetric RS256 JWT signatures. Downstream services trust the gateway verified payload containing user IDs, eliminating public-key request fanning.")
                .futureScope("Transition to Kubernetes deployment and wire up Istio service mesh for advanced traffic shaping.")
                .build());

        projectRepository.save(Project.builder()
                .title("Enterprise Personal Finance & Wealth Management Platform")
                .description("An 8-service financial analytics system supporting multi-currency expense logs, automatic budget alerts, and investment calculations with event-driven notification triggers.")
                .techStack(Arrays.asList("Spring Boot", "React", "TypeScript", "PostgreSQL", "Redis", "Kafka", "JWT", "AWS", "Recharts"))
                .githubUrl("https://github.com/kalvaakhil/Web-Dev/tree/main/FinanceMonitoring%20System")
                .liveUrl("https://finflow.akhilkalva.dev")
                .imageUrl("/assets/projects/finance.png")
                .businessProblem("Users struggle to analyze budgets due to latency in aggregating transaction histories across different budget headers and expense lists.")
                .solution("Built isolated microservices for Expense tracking, Budgeting, Investment portfolio logs, Analytics, and Alerts. The analytics service aggregates metrics asynchronously using Kafka transaction feeds, storing aggregated daily charts in Redis for sub-millisecond retrieval.")
                .features(Arrays.asList(
                        "Interactive Analytics: Draws interactive wealth curves, asset allocations, and budget allocations using Recharts.",
                        "Automated Alerts: Triggers immediate push alerts and email summaries if transactions exceed category budgets.",
                        "Report Exporting: Supports generating downloadable PDF balances and Excel/CSV transaction spreadsheets.",
                        "Mock AI Wealth Advisor: Evaluates financial status and scores overall credit health."
                ))
                .challenges("We solved a Jackson/Hibernate lazy-loading proxy loop error. Serializing JPA entities directly with proxy classes caused JSON loops.")
                .lessonsLearned("Introduced a clean DTO mapping layer using MapStruct, separating data representation from model entities. Never expose raw JPA models to controller responses.")
                .performanceOptimizations("Configured a grace-degrading cache fallback. If Redis fails, the system switches to in-memory ConcurrentHashMap cache containers without throwing errors.")
                .securityFeatures("Hashed OTP storage using BCrypt with custom salt factors and expiries. Prevents brute-forcing login resets.")
                .futureScope("Connect Plaid APIs to download real bank ledger transactions automatically.")
                .build());

        projectRepository.save(Project.builder()
                .title("AI Job Search Automation Platform")
                .description("A full-stack client-server portal that aggregates tech postings from multiple job boards, evaluates resume matches using NLP criteria, and tracks application pipelines.")
                .techStack(Arrays.asList("Spring Boot", "React", "PostgreSQL", "React Query", "Axios", "Bootstrap", "Swagger"))
                .githubUrl("https://github.com/kalvaakhil/Web-Dev")
                .liveUrl("https://jobsearch.akhilkalva.dev")
                .imageUrl("/assets/projects/jobsearch.png")
                .businessProblem("Job hunting involves copying data across dozens of different applications, tracking status on spreadsheets, and manually comparing resume keywords against listing requirements.")
                .solution("Created a unified portal that aggregates job postings using targeted scrapers, stores them in PostgreSQL, indexes them for full-text search, and runs a semantic comparison helper to grade resume alignment. Users manage application statuses on an interactive Kanban board.")
                .features(Arrays.asList(
                        "NLP Resume Matching: Scores CV texts against job descriptions to highlight critical missing technical keywords.",
                        "Scraper Pipelines: Aggregates listings from public boards with automated job scheduling.",
                        "Visual Kanban Pipeline: Drag and drop applications from 'Applied' to 'Interviewing' and 'Offer'.",
                        "Recruiter Logs: Maintains email chains, interview dates, and contact profiles."
                ))
                .challenges("Managing duplicate job posts from web scraping. Job titles and descriptions often vary slightly while pointing to the same role.")
                .lessonsLearned("Created a deduplication engine using title hashing and Jaccard similarity indices to group and merge highly similar job posts.")
                .performanceOptimizations("React Query (TanStack Query) handles client caching and optimistic updates, lowering API refetches and providing rapid UI responses.")
                .securityFeatures("Protected JWT cookie storage, CSRF protection, and validation filter controls on all admin endpoints.")
                .futureScope("Integrating OpenAI GPT model APIs to draft personalized cover letters matching specific job descriptions.")
                .build());
    }

    private void seedCertificationsAndAchievements() {
        certificationRepository.save(Certification.builder()
                .name("AWS Certified Developer – Associate")
                .issuer("Amazon Web Services (AWS)")
                .issueDate("October 2024")
                .credentialId("AWS-DEV-ASSOC-999")
                .credentialUrl("https://aws.amazon.com/verification")
                .build());

        certificationRepository.save(Certification.builder()
                .name("Oracle Certified Professional: Java SE 17 Developer")
                .issuer("Oracle")
                .issueDate("March 2024")
                .credentialId("OCP-JAVA-17-777")
                .credentialUrl("https://education.oracle.com")
                .build());

        achievementRepository.save(Achievement.builder()
                .title("First Place - Sathyabama Hackathon")
                .description("Led a team of 4 to build a distributed disaster-alerting prototype using WebSocket and Java, winning 1st place out of 60 competing teams.")
                .dateAchieved("November 2023")
                .build());

        achievementRepository.save(Achievement.builder()
                .title("Academic Excellence Award")
                .description("Maintained an overall CGPA of 9.45/10, ranking in the top 3% of the Computer Science branch.")
                .dateAchieved("May 2024")
                .build());
    }

    private void seedTestimonials() {
        testimonialRepository.save(Testimonial.builder()
                .clientName("Suresh Kumar")
                .role("Senior Engineering Manager")
                .company("Core Solutions Corp")
                .feedback("Akhil is a highly capable developer. During his internship, he independently rewrote our JWT authentication layer, resolving long-standing security bugs that had baffled senior engineers.")
                .imageUrl("/assets/testimonials/suresh.jpg")
                .build());

        testimonialRepository.save(Testimonial.builder()
                .clientName("Emily Watson")
                .role("Product Director")
                .company("Enterprise Tech Solutions")
                .feedback("Akhil brought exceptional product thinking to the table. His design of our Redis caching fallback strategy prevented dashboard outages when Redis crashed, displaying safe, cached data. Highly recommended!")
                .imageUrl("/assets/testimonials/emily.jpg")
                .build());
    }

    private void seedBlogs() {
        blogRepository.save(Blog.builder()
                .title("Building Resilient Microservices with Resilience4j and Spring Boot")
                .summary("Explore how to safeguard distributed REST networks from cascading service outages by implementing circuit breakers, retries, and rate limiters.")
                .content("""
                        # Building Resilient Microservices with Resilience4j and Spring Boot

                        In a microservices architecture, dependencies are inevitable. The `order-service` calls `inventory-service`, which in turn talks to `supplier-db`. But what happens if the inventory service becomes sluggish or experiences complete outages? Without protection, your entire call stack collapses.

                        This blog outlines how to safeguard your APIs using **Resilience4j** within a Spring Boot application.

                        ---

                        ## 1. What is a Circuit Breaker?

                        A circuit breaker monitors synchronous call states:
                        - **Closed**: Requests flow normally. If failure rates cross a limit (e.g. 50% failures), the breaker trips.
                        - **Open**: Calls fail immediately with a `CallNotPermittedException`. No requests hit the degraded service.
                        - **Half-Open**: After a cooldown period, some requests are let through to see if the target service has recovered.

                        ---

                        ## 2. Spring Boot Implementation

                        Add the dependency to your `pom.xml`:

                        ```xml
                        <dependency>
                            <groupId>io.github.resilience4j</groupId>
                            <artifactId>resilience4j-spring-boot3</artifactId>
                            <version>2.2.0</version>
                        </dependency>
                        ```

                        ### Configuration

                        Define settings in `application.yml`:

                        ```yaml
                        resilience4j.circuitbreaker:
                          instances:
                            inventoryService:
                              slidingWindowSize: 10
                              failureRateThreshold: 50
                              waitDurationInOpenState: 10000
                              permittedNumberOfCallsInHalfOpenState: 3
                        ```

                        ### Code Annotation

                        Annotate your Feign or RestTemplate call service method:

                        ```java
                        @CircuitBreaker(name = "inventoryService", fallbackMethod = "fallbackInventoryCheck")
                        public InventoryResponse checkStock(Long productId) {
                            return inventoryClient.checkStock(productId);
                        }

                        // Fallback method must have the same signature plus an Exception parameter
                        public InventoryResponse fallbackInventoryCheck(Long productId, Throwable t) {
                            log.warn("Inventory service is down. Returning mock safety stock. Error: {}", t.getMessage());
                            return new InventoryResponse(productId, true, 0); // Safe fallback
                        }
                        ```

                        ---

                        ## 3. Key Takeaway

                        Designing for failures is a signature mark of senior engineering. By configuring default fallbacks, your product degrades gracefully instead of crashing completely.

                        *What resilience patterns do you run in production? Let's discuss in the contact section!*
                        """)
                .category("Backend")
                .tags(Arrays.asList("Spring Boot", "Microservices", "Resilience4j", "Circuit Breaker"))
                .readTime(5)
                .build());

        blogRepository.save(Blog.builder()
                .title("Implementing Event-Driven Caching inside Spring Boot using Redis and Kafka")
                .summary("Understand how to design a high-performance read path using the Cache-aside pattern and Kafka event-driven cache invalidation.")
                .content("""
                        # Event-Driven Caching with Redis and Kafka

                        Caching aggregate summaries (like financial dashboards or search lists) is a great way to boost app speed. But caches get stale quickly. If a user posts a transaction, how do you keep the dashboard accurate?

                        A generic approach is to wait for the Cache TTL (Time-To-Live) to expire (e.g., 10 minutes). However, users hate seeing stale balances. We can solve this by implementing **Event-Driven Cache Invalidation** via Kafka.

                        ---

                        ## The Architecture Flow

                        ```mermaid
                        sequenceDiagram
                            User->>Transaction Service: Post Transaction
                            Transaction Service->>PostgreSQL: Save Transaction
                            Transaction Service->>Kafka: Publish "transaction-created" Event
                            Kafka->>Analytics Service: Consume Event
                            Analytics Service->>Redis: Evict Cached Dashboard
                            User->>Analytics Service: Get Dashboard (Cache Miss)
                            Analytics Service->>PostgreSQL: Calculate Fresh Dashboard
                            Analytics Service->>Redis: Populate Cache
                        ```

                        ---

                        ## Implementation Steps

                        ### 1. Spring Boot Cache Configuration

                        Annotate your fetch method with `@Cacheable`:

                        ```java
                        @Cacheable(value = "dashboards", key = "#userId")
                        public DashboardSummary getDashboard(Long userId) {
                            log.info("Cache miss! Computing dashboard from database...");
                            return computeDashboardFromDb(userId);
                        }
                        ```

                        ### 2. Kafka Event Listener

                        Listen to the transaction topic. When an update occurs, evict the user's cache:

                        ```java
                        @KafkaListener(topics = "transaction-events", groupId = "analytics-group")
                        public void handleTransactionEvent(TransactionEvent event) {
                            log.info("Received event for user: {}. Evicting cache.", event.getUserId());
                            evictUserCache(event.getUserId());
                        }

                        @CacheEvict(value = "dashboards", key = "#userId")
                        public void evictUserCache(Long userId) {
                            log.info("Dashboard cache successfully cleared for user: {}", userId);
                        }
                        ```

                        ---

                        ## Benefits of this Design

                        1. **Near-Zero Stale Data**: The dashboard remains accurate within milliseconds of a new transaction.
                        2. **Low Database Load**: Read transactions hit Redis 99% of the time, bypassing complex SQL operations.
                        3. **Graceful Fallbacks**: If Redis goes down, `@Cacheable` degrades to local databases seamlessly.

                        *Event-driven caching is the standard for high-volume modern microservice products.*
                        """)
                .category("Architecture")
                .tags(Arrays.asList("Spring Boot", "Redis", "Kafka", "Caching"))
                .readTime(6)
                .build());
    }
}
