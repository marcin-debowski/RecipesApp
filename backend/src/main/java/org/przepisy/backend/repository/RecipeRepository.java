package org.przepisy.backend.repository;

import org.przepisy.backend.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    // Find recipes by author
    Page<Recipe> findByAuthor_UserId(Integer authorId, Pageable pageable);

    // Search recipes by title (case insensitive)
    Page<Recipe> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    // Search recipes by title or ingredients (case insensitive)
    @Query("SELECT r FROM Recipe r WHERE " +
            "LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(r.ingredients) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(r.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Recipe> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    // Get recipes with their average ratings
    @Query("SELECT r FROM Recipe r LEFT JOIN r.ratings rt " +
            "GROUP BY r.recipeId " +
            "ORDER BY AVG(rt.value) DESC")
    Page<Recipe> findAllOrderByAverageRating(Pageable pageable);

    // Get recipes by minimum average rating
    @Query("SELECT r FROM Recipe r LEFT JOIN r.ratings rt " +
            "GROUP BY r.recipeId " +
            "HAVING AVG(rt.value) >= :minRating OR COUNT(rt) = 0")
    Page<Recipe> findByMinimumRating(@Param("minRating") Double minRating, Pageable pageable);

    // Get most recent recipes
    Page<Recipe> findAllByOrderByRecipeIdDesc(Pageable pageable);
}
