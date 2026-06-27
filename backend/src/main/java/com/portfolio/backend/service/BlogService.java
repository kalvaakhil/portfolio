package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Blog;
import com.portfolio.backend.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;

    @Cacheable(value = "blogs")
    @Transactional(readOnly = true)
    public List<Blog> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public List<Blog> searchBlogs(String query) {
        if (query == null || query.isBlank()) {
            return getAllBlogs();
        }
        return blogRepository.findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByCreatedAtDesc(
                query, query, query);
    }

    @Transactional(readOnly = true)
    public List<Blog> getBlogsByCategory(String category) {
        return blogRepository.findByCategoryIgnoreCaseOrderByCreatedAtDesc(category);
    }

    @Transactional
    public Blog getBlogByIdAndIncrementViews(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));
        blog.setViewsCount(blog.getViewsCount() + 1);
        return blogRepository.save(blog);
    }

    @Transactional(readOnly = true)
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));
    }

    @CacheEvict(value = "blogs", allEntries = true)
    @Transactional
    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    @CacheEvict(value = "blogs", allEntries = true)
    @Transactional
    public Blog updateBlog(Long id, Blog blogDetails) {
        Blog blog = getBlogById(id);
        blog.setTitle(blogDetails.getTitle());
        blog.setContent(blogDetails.getContent());
        blog.setSummary(blogDetails.getSummary());
        blog.setCategory(blogDetails.getCategory());
        blog.setTags(blogDetails.getTags());
        blog.setReadTime(blogDetails.getReadTime());
        return blogRepository.save(blog);
    }

    @CacheEvict(value = "blogs", allEntries = true)
    @Transactional
    public void deleteBlog(Long id) {
        Blog blog = getBlogById(id);
        blogRepository.delete(blog);
    }
}
