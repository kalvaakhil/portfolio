package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Testimonial;
import com.portfolio.backend.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestimonialService {

    private static final Logger log = LoggerFactory.getLogger(TestimonialService.class);

    private final TestimonialRepository testimonialRepository;

    @Cacheable(value = "testimonials")
    @Transactional(readOnly = true)
    public List<Testimonial> getAllTestimonials() {
        log.debug("Fetching all testimonials");
        List<Testimonial> testimonials = testimonialRepository.findAll();
        log.debug("Fetched {} testimonials", testimonials.size());
        return testimonials;
    }

    @Transactional(readOnly = true)
    public Testimonial getTestimonialById(Long id) {
        log.debug("Fetching testimonial id={}", id);
        return testimonialRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Testimonial not found with id: {}", id);
                    return new ResourceNotFoundException("Testimonial not found with id: " + id);
                });
    }

    @CacheEvict(value = "testimonials", allEntries = true)
    @Transactional
    public Testimonial createTestimonial(Testimonial testimonial) {
        log.info("Creating new testimonial from: {}", testimonial.getClientName());
        Testimonial saved = testimonialRepository.save(testimonial);
        log.info("Testimonial created with id={}", saved.getId());
        return saved;
    }

    @CacheEvict(value = "testimonials", allEntries = true)
    @Transactional
    public Testimonial updateTestimonial(Long id, Testimonial details) {
        log.info("Updating testimonial id={}", id);
        Testimonial testimonial = getTestimonialById(id);
        testimonial.setClientName(details.getClientName());
        testimonial.setRole(details.getRole());
        testimonial.setCompany(details.getCompany());
        testimonial.setFeedback(details.getFeedback());
        testimonial.setImageUrl(details.getImageUrl());
        Testimonial updated = testimonialRepository.save(testimonial);
        log.info("Testimonial id={} updated successfully", id);
        return updated;
    }

    @CacheEvict(value = "testimonials", allEntries = true)
    @Transactional
    public void deleteTestimonial(Long id) {
        log.info("Deleting testimonial id={}", id);
        Testimonial testimonial = getTestimonialById(id);
        testimonialRepository.delete(testimonial);
        log.info("Testimonial id={} deleted successfully", id);
    }
}
