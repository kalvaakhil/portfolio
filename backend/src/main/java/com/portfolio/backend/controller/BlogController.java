package com.portfolio.backend.controller;

import com.portfolio.backend.model.Blog;
import com.portfolio.backend.service.BlogService;
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
public class BlogController {

    private static final Logger log = LoggerFactory.getLogger(BlogController.class);

    private final BlogService blogService;

    @GetMapping("/api/blogs")
    public ResponseEntity<List<Blog>> getAllBlogs() {
        log.debug("GET /api/blogs");
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    @GetMapping("/api/blogs/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        log.debug("GET /api/blogs/{}", id);
        return ResponseEntity.ok(blogService.getBlogByIdAndIncrementViews(id));
    }

    @GetMapping("/api/blogs/search")
    public ResponseEntity<List<Blog>> searchBlogs(@RequestParam String q) {
        log.debug("GET /api/blogs/search?q={}", q);
        return ResponseEntity.ok(blogService.searchBlogs(q));
    }

    @GetMapping("/api/blogs/category/{category}")
    public ResponseEntity<List<Blog>> getBlogsByCategory(@PathVariable String category) {
        log.debug("GET /api/blogs/category/{}", category);
        return ResponseEntity.ok(blogService.getBlogsByCategory(category));
    }

    @PostMapping("/api/admin/blogs")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) {
        log.info("POST /api/admin/blogs — creating blog: '{}'", blog.getTitle());
        return new ResponseEntity<>(blogService.createBlog(blog), HttpStatus.CREATED);
    }

    @PutMapping("/api/admin/blogs/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody Blog blog) {
        log.info("PUT /api/admin/blogs/{}", id);
        return ResponseEntity.ok(blogService.updateBlog(id, blog));
    }

    @DeleteMapping("/api/admin/blogs/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        log.info("DELETE /api/admin/blogs/{}", id);
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }
}
