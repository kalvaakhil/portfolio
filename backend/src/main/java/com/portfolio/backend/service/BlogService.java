package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Blog;
import com.portfolio.backend.repository.BlogRepository;
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
public class BlogService {

    private static final Logger log = LoggerFactory.getLogger(BlogService.class);

    private final BlogRepository blogRepository;

    @Cacheable(value = "blogs")
    @Transactional(readOnly = true)
    public List<Blog> getAllBlogs() {
        log.debug("Fetching all blog posts");
        List<Blog> blogs = blogRepository.findAllByOrderByCreatedAtDesc();
        log.debug("Fetched {} blog posts", blogs.size());
        return blogs;
    }

    @Transactional(readOnly = true)
    public List<Blog> searchBlogs(String query) {
        if (query == null || query.isBlank()) {
            log.debug("Empty search query — returning all blogs");
            return getAllBlogs();
        }
        log.debug("Searching blogs with query='{}'", query);
        List<Blog> results = blogRepository
                .findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByCreatedAtDesc(
                        query, query, query);
        log.debug("Search for '{}' returned {} results", query, results.size());
        return results;
    }

    @Transactional(readOnly = true)
    public List<Blog> getBlogsByCategory(String category) {
        log.debug("Fetching blogs by category='{}'", category);
        List<Blog> blogs = blogRepository.findByCategoryIgnoreCaseOrderByCreatedAtDesc(category);
        log.debug("Found {} blogs in category='{}'", blogs.size(), category);
        return blogs;
    }

    @Transactional
    public Blog getBlogByIdAndIncrementViews(Long id) {
        log.debug("Fetching blog id={} and incrementing view count", id);
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Blog post not found with id: {}", id);
                    return new ResourceNotFoundException("Blog post not found with id: " + id);
                });
        blog.setViewsCount(blog.getViewsCount() + 1);
        Blog saved = blogRepository.save(blog);
        log.debug("Blog id={} view count updated to {}", id, saved.getViewsCount());
        return saved;
    }

    @Transactional(readOnly = true)
    public Blog getBlogById(Long id) {
        log.debug("Fetching blog id={}", id);
        return blogRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Blog post not found with id: {}", id);
                    return new ResourceNotFoundException("Blog post not found with id: " + id);
                });
    }

    @CacheEvict(value = "blogs", allEntries = true)
    @Transactional
    public Blog createBlog(Blog blog) {
        log.info("Creating new blog post: '{}'", blog.getTitle());
        Blog saved = blogRepository.save(blog);
        log.info("Blog post created with id={}, title='{}'", saved.getId(), saved.getTitle());
        return saved;
    }

    @CacheEvict(value = "blogs", allEntries = true)
    @Transactional
    public Blog updateBlog(Long id, Blog blogDetails) {
        log.info("Updating blog post id={}", id);
        Blog blog = getBlogById(id);
        blog.setTitle(blogDetails.getTitle());
        blog.setContent(blogDetails.getContent());
        blog.setSummary(blogDetails.getSummary());
        blog.setCategory(blogDetails.getCategory());
        blog.setTags(blogDetails.getTags());
        blog.setReadTime(blogDetails.getReadTime());
        Blog updated = blogRepository.save(blog);
        log.info("Blog post id={} updated successfully", id);
        return updated;
    }

    @CacheEvict(value = "blogs", allEntries = true)
    @Transactional
    public void deleteBlog(Long id) {
        log.info("Deleting blog post id={}", id);
        Blog blog = getBlogById(id);
        blogRepository.delete(blog);
        log.info("Blog post id={} deleted successfully", id);
    }
}
