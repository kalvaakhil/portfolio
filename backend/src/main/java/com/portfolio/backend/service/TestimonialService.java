package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Testimonial;
import com.portfolio.backend.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    @Cacheable(value = "testimonials")
    @Transactional(readOnly = true)
    public List<Testimonial> getAllTestimonials() {
        return testimonialRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Testimonial getTestimonialById(Long id) {
        return testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));
    }

    @CacheEvict(value = "testimonials", allEntries = true)
    @Transactional
    public Testimonial createTestimonial(Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }

    @CacheEvict(value = "testimonials", allEntries = true)
    @Transactional
    public Testimonial updateTestimonial(Long id, Testimonial details) {
        Testimonial testimonial = getTestimonialById(id);
        testimonial.setClientName(details.getClientName());
        testimonial.setRole(details.getRole());
        testimonial.setCompany(details.getCompany());
        testimonial.setFeedback(details.getFeedback());
        testimonial.setImageUrl(details.getImageUrl());
        return testimonialRepository.save(testimonial);
    }

    @CacheEvict(value = "testimonials", allEntries = true)
    @Transactional
    public void deleteTestimonial(Long id) {
        Testimonial testimonial = getTestimonialById(id);
        testimonialRepository.delete(testimonial);
    }
}
