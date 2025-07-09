package org.przepisy.backend.controller;

import jakarta.validation.Valid;
import org.przepisy.backend.dto.request.RatingRequest;
import org.przepisy.backend.dto.response.ApiResponse;
import org.przepisy.backend.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:5174", maxAge = 3600)
public class RatingController {
    @Autowired
    private RatingService ratingService;

    @PostMapping("/{recipeId}/rate")
    public ResponseEntity<ApiResponse<Void>> rateRecipe(
            @PathVariable Integer recipeId,
            @Valid @RequestBody RatingRequest ratingRequest) {
        try {
            ratingService.rateRecipe(recipeId, ratingRequest);
            return ResponseEntity.ok(ApiResponse.success("Recipe rated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{recipeId}/rate")
    public ResponseEntity<ApiResponse<Void>> removeRating(@PathVariable Integer recipeId) {
        try {
            ratingService.removeRating(recipeId);
            return ResponseEntity.ok(ApiResponse.success("Rating removed successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{recipeId}/rating/average")
    public ResponseEntity<ApiResponse<Double>> getAverageRating(@PathVariable Integer recipeId) {
        try {
            Double averageRating = ratingService.getAverageRating(recipeId);
            return ResponseEntity.ok(ApiResponse.success("Average rating retrieved successfully", averageRating));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{recipeId}/rating/user")
    public ResponseEntity<ApiResponse<Integer>> getUserRating(@PathVariable Integer recipeId) {
        try {
            Integer userRating = ratingService.getUserRating(recipeId);
            return ResponseEntity.ok(ApiResponse.success("User rating retrieved successfully", userRating));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
