package com.portfolio.backend.controller;

import com.portfolio.backend.model.Testimonial;
import com.portfolio.backend.service.TestimonialService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TestimonialController {

    private static final Logger log = LoggerFactory.getLogger(TestimonialController.class);

    private final TestimonialService testimonialService;

    @GetMapping("/api/testimonials")
    public ResponseEntity<List<Testimonial>> getAllTestimonials() {
        log.debug("GET /api/testimonials");
        return ResponseEntity.ok(testimonialService.getAllTestimonials());
    }

    @PostMapping("/api/admin/testimonials")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Testimonial> createTestimonial(@RequestBody Testimonial testimonial) {
        log.info("POST /api/admin/testimonials — creating from: '{}'", testimonial.getClientName());
        return new ResponseEntity<>(testimonialService.createTestimonial(testimonial), HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/testimonials/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Testimonial> updateTestimonial(@PathVariable Long id, @RequestBody Testimonial testimonial) {
        log.info("PUT /api/admin/testimonials/{}", id);
        return ResponseEntity.ok(testimonialService.updateTestimonial(id, testimonial));
    }

    @DeleteMapping("/api/admin/testimonials/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        log.info("DELETE /api/admin/testimonials/{}", id);
        testimonialService.deleteTestimonial(id);
        return ResponseEntity.noContent().build();
    }
}
