package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Blog;
import com.portfolio.backend.repository.BlogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BlogServiceTest {

    @Mock
    private BlogRepository blogRepository;

    @InjectMocks
    private BlogService blogService;

    private Blog sampleBlog;

    @BeforeEach
    void setUp() {
        sampleBlog = Blog.builder()
                .id(1L)
                .title("Spring Boot Resiliency")
                .summary("Circuit Breaker guide")
                .content("Detailed content about Resilience4j")
                .category("Backend")
                .tags(Arrays.asList("Spring", "Resilience"))
                .viewsCount(10)
                .readTime(5)
                .build();
    }

    @Test
    void testGetAllBlogs_Success() {
        when(blogRepository.findAllByOrderByCreatedAtDesc()).thenReturn(Arrays.asList(sampleBlog));

        List<Blog> result = blogService.getAllBlogs();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Spring Boot Resiliency", result.get(0).getTitle());
        verify(blogRepository, times(1)).findAllByOrderByCreatedAtDesc();
    }

    @Test
    void testSearchBlogs_WithQuery_Success() {
        when(blogRepository.findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByCreatedAtDesc(
                "resilience", "resilience", "resilience"))
                .thenReturn(Arrays.asList(sampleBlog));

        List<Blog> result = blogService.searchBlogs("resilience");

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(blogRepository, times(1)).findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByCreatedAtDesc(any(), any(), any());
    }

    @Test
    void testSearchBlogs_EmptyQuery_ReturnsAll() {
        when(blogRepository.findAllByOrderByCreatedAtDesc()).thenReturn(Arrays.asList(sampleBlog));

        List<Blog> result = blogService.searchBlogs(" ");

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(blogRepository, times(1)).findAllByOrderByCreatedAtDesc();
    }

    @Test
    void testGetBlogsByCategory_Success() {
        when(blogRepository.findByCategoryIgnoreCaseOrderByCreatedAtDesc("Backend")).thenReturn(Arrays.asList(sampleBlog));

        List<Blog> result = blogService.getBlogsByCategory("Backend");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Backend", result.get(0).getCategory());
    }

    @Test
    void testGetBlogByIdAndIncrementViews_Success() {
        when(blogRepository.findById(1L)).thenReturn(Optional.of(sampleBlog));
        when(blogRepository.save(any(Blog.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Blog result = blogService.getBlogByIdAndIncrementViews(1L);

        assertNotNull(result);
        assertEquals(11, result.getViewsCount()); // View count incremented: 10 + 1 = 11
        verify(blogRepository, times(1)).save(sampleBlog);
    }

    @Test
    void testGetBlogById_NotFound_ThrowsException() {
        when(blogRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> blogService.getBlogById(99L));
    }

    @Test
    void testCreateBlog_Success() {
        when(blogRepository.save(any(Blog.class))).thenReturn(sampleBlog);

        Blog result = blogService.createBlog(sampleBlog);

        assertNotNull(result);
        assertEquals("Spring Boot Resiliency", result.getTitle());
    }

    @Test
    void testUpdateBlog_Success() {
        when(blogRepository.findById(1L)).thenReturn(Optional.of(sampleBlog));
        when(blogRepository.save(any(Blog.class))).thenReturn(sampleBlog);

        Blog updatedDetails = Blog.builder()
                .title("New Blog Title")
                .content("Updated content body")
                .build();

        Blog result = blogService.updateBlog(1L, updatedDetails);

        assertNotNull(result);
        assertEquals("New Blog Title", result.getTitle());
        verify(blogRepository, times(1)).save(any(Blog.class));
    }

    @Test
    void testDeleteBlog_Success() {
        when(blogRepository.findById(1L)).thenReturn(Optional.of(sampleBlog));
        doNothing().when(blogRepository).delete(sampleBlog);

        blogService.deleteBlog(1L);

        verify(blogRepository, times(1)).delete(sampleBlog);
    }
}
