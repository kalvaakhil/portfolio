package com.portfolio.backend.repository;

import com.portfolio.backend.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findAllByOrderByCreatedAtDesc();
    
    List<Blog> findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByCreatedAtDesc(
            String title, String summary, String content);
            
    List<Blog> findByCategoryIgnoreCaseOrderByCreatedAtDesc(String category);
}
