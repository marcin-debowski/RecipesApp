package org.przepisy.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import org.przepisy.backend.dto.RecipeDto;
import org.przepisy.backend.dto.request.RecipeRequest;
import org.przepisy.backend.dto.response.ApiResponse;
import org.przepisy.backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:5174", maxAge = 3600)
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private Validator validator;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse<RecipeDto>> createRecipe(
            @RequestPart("recipe") String recipeJson,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            // Parse JSON string to RecipeRequest object
            ObjectMapper objectMapper = new ObjectMapper();
            RecipeRequest recipeRequest = objectMapper.readValue(recipeJson, RecipeRequest.class);

            // Manual validation
            Set<ConstraintViolation<RecipeRequest>> violations = validator.validate(recipeRequest);
            if (!violations.isEmpty()) {
                StringBuilder sb = new StringBuilder();
                for (ConstraintViolation<RecipeRequest> violation : violations) {
                    sb.append(violation.getPropertyPath()).append(": ").append(violation.getMessage()).append("; ");
                }
                return ResponseEntity.badRequest().body(ApiResponse.error("Validation failed: " + sb.toString()));
            }

            RecipeDto recipeDto = recipeService.createRecipe(recipeRequest, image);
            return ResponseEntity.ok(ApiResponse.success("Recipe created successfully", recipeDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error creating recipe: " + e.getMessage()));
        }
    }

    @PutMapping(value = "/{recipeId}", consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse<RecipeDto>> updateRecipe(
            @PathVariable Integer recipeId,
            @RequestPart("recipe") String recipeJson,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            RecipeRequest recipeRequest = objectMapper.readValue(recipeJson, RecipeRequest.class);

            Set<ConstraintViolation<RecipeRequest>> violations = validator.validate(recipeRequest);
            if (!violations.isEmpty()) {
                StringBuilder sb = new StringBuilder();
                for (ConstraintViolation<RecipeRequest> violation : violations) {
                    sb.append(violation.getPropertyPath()).append(": ").append(violation.getMessage()).append("; ");
                }
                return ResponseEntity.badRequest().body(ApiResponse.error("Validation failed: " + sb.toString()));
            }

            RecipeDto recipeDto = recipeService.updateRecipe(recipeId, recipeRequest, image);
            return ResponseEntity.ok(ApiResponse.success("Recipe updated successfully", recipeDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error updating recipe: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<ApiResponse<Void>> deleteRecipe(@PathVariable Integer recipeId) {
        try {
            recipeService.deleteRecipe(recipeId);
            return ResponseEntity.ok(ApiResponse.success("Recipe deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity<ApiResponse<RecipeDto>> getRecipeById(@PathVariable Integer recipeId) {
        try {
            RecipeDto recipeDto = recipeService.getRecipeById(recipeId);
            return ResponseEntity.ok(ApiResponse.success("Recipe retrieved successfully", recipeDto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<RecipeDto>>> getAllRecipes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "recent") String sortBy) {
        try {
            Page<RecipeDto> recipes = recipeService.getAllRecipes(page, size, sortBy);
            return ResponseEntity.ok(ApiResponse.success("Recipes retrieved successfully", recipes));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<RecipeDto>>> searchRecipes(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<RecipeDto> recipes = recipeService.searchRecipes(keyword, page, size);
            return ResponseEntity.ok(ApiResponse.success("Search completed successfully", recipes));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}