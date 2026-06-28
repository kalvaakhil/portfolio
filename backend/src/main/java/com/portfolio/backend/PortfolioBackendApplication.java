package com.portfolio.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableCaching
@EnableAsync
public class PortfolioBackendApplication {

    private static final Logger log = LoggerFactory.getLogger(PortfolioBackendApplication.class);

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(PortfolioBackendApplication.class);
        app.run(args);
        log.info("=======================================================");
        log.info("  Portfolio Backend API started successfully");
        log.info("  Swagger UI: http://localhost:8080/swagger-ui/index.html");
        log.info("  H2 Console:  http://localhost:8080/h2-console");
        log.info("  API Docs:    http://localhost:8080/v3/api-docs");
        log.info("=======================================================");
    }
}
