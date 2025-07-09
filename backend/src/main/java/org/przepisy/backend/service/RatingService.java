package org.przepisy.backend.service;

import org.przepisy.backend.dto.request.RatingRequest;
import org.przepisy.backend.entity.Rating;
import org.przepisy.backend.entity.Recipe;
import org.przepisy.backend.entity.User;
import org.przepisy.backend.repository.RatingRepository;
import org.przepisy.backend.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@Transactional
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserService userService;

    public void rateRecipe(Integer recipeId, RatingRequest ratingRequest) {
        User currentUser = userService.getCurrentUser();
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        // Check if user already rated this recipe
        Optional<Rating> existingRating = ratingRepository
                .findByUser_UserIdAndRecipe_RecipeId(currentUser.getUserId(), recipeId);

        if (existingRating.isPresent()) {
            // Update existing rating
            Rating rating = existingRating.get();
            rating.setValue(ratingRequest.getValue());
            ratingRepository.save(rating);
        } else {
            // Create new rating
            Rating rating = new Rating();
            rating.setValue(ratingRequest.getValue());
            rating.setUser(currentUser);
            rating.setRecipe(recipe);
            ratingRepository.save(rating);
        }
    }

    public void removeRating(Integer recipeId) {
        User currentUser = userService.getCurrentUser();
        Rating rating = ratingRepository
                .findByUser_UserIdAndRecipe_RecipeId(currentUser.getUserId(), recipeId)
                .orElseThrow(() -> new RuntimeException("Rating not found"));

        ratingRepository.delete(rating);
    }

    public Double getAverageRating(Integer recipeId) {
        return ratingRepository.findAverageRatingByRecipeId(recipeId).orElse(0.0);
    }

    public Integer getUserRating(Integer recipeId) {
        User currentUser = userService.getCurrentUser();
        return ratingRepository
                .findByUser_UserIdAndRecipe_RecipeId(currentUser.getUserId(), recipeId)
                .map(Rating::getValue)
                .orElse(null);
    }
}