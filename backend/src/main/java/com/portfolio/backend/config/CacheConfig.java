package com.portfolio.backend.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;

import java.time.Duration;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    @Primary
    public CacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        try {
            // Test the connection immediately on startup
            connectionFactory.getConnection().close();
            
            RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                    .entryTtl(Duration.ofHours(24))
                    .disableCachingNullValues();
            
            System.out.println("Redis caching initialized successfully.");
            return RedisCacheManager.builder(connectionFactory)
                    .cacheDefaults(config)
                    .build();
        } catch (Exception e) {
            System.err.println("Redis is unreachable. Falling back to in-memory ConcurrentMapCacheManager. Error: " + e.getMessage());
            return new ConcurrentMapCacheManager(
                    "projects", 
                    "blogs", 
                    "skills", 
                    "experiences", 
                    "educations", 
                    "certifications", 
                    "achievements", 
                    "testimonials"
            );
        }
    }
}
