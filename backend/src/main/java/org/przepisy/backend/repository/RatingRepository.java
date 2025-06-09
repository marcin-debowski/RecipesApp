package org.przepisy.backend.repository;

import org.przepisy.backend.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {
    // Find rating by user and recipe (for checking if user already rated)
    Optional<Rating> findByUser_UserIdAndRecipe_RecipeId(Integer userId, Integer recipeId);

    // Find all ratings for a specific recipe
    List<Rating> findByRecipe_RecipeId(Integer recipeId);

    // Find all ratings by a specific user
    List<Rating> findByUser_UserId(Integer userId);

    // Calculate average rating for a recipe
    @Query("SELECT AVG(r.value) FROM Rating r WHERE r.recipe.recipeId = :recipeId")
    Optional<Double> findAverageRatingByRecipeId(@Param("recipeId") Integer recipeId);

    // Count total ratings for a recipe
    long countByRecipe_RecipeId(Integer recipeId);

    // Get rating distribution for a recipe
    @Query("SELECT r.value, COUNT(r) FROM Rating r WHERE r.recipe.recipeId = :recipeId GROUP BY r.value")
    List<Object[]> findRatingDistributionByRecipeId(@Param("recipeId") Integer recipeId);

    // Check if user has rated a recipe
    boolean existsByUser_UserIdAndRecipe_RecipeId(Integer userId, Integer recipeId);
}
