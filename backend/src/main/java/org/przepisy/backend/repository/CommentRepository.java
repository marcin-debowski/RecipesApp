package org.przepisy.backend.repository;

import org.przepisy.backend.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    // Find comments by recipe ID with pagination
    Page<Comment> findByRecipe_RecipeIdOrderByDataCreatedDesc(Integer recipeId, Pageable pageable);

    // Find comments by user ID
    Page<Comment> findByUser_UserIdOrderByDataCreatedDesc(Integer userId, Pageable pageable);

    // Count comments for a specific recipe
    long countByRecipe_RecipeId(Integer recipeId);

    // Get latest comments for a recipe
    List<Comment> findTop5ByRecipe_RecipeIdOrderByDataCreatedDesc(Integer recipeId);
}
