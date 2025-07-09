package org.przepisy.backend.controller;

import org.przepisy.backend.dto.RecipeDto;
import org.przepisy.backend.dto.response.ApiResponse;
import org.przepisy.backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5174", maxAge = 3600)
public class UserRecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/{userId}/recipes")
    public ResponseEntity<ApiResponse<Page<RecipeDto>>> getRecipesByUser(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<RecipeDto> recipes = recipeService.getRecipesByUser(userId, page, size);
            return ResponseEntity.ok(ApiResponse.success("User recipes retrieved successfully", recipes));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
