package org.przepisy.backend.service;
import org.przepisy.backend.dto.*;
import org.przepisy.backend.entity.Recipe;
import org.przepisy.backend.entity.User;
import org.przepisy.backend.repository.RecipeRepository;
import org.przepisy.backend.repository.RatingRepository;
import org.przepisy.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.przepisy.backend.dto.request.RecipeRequest;
@Service
@Transactional
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private FileStorageService fileStorageService;

    public RecipeDto createRecipe(RecipeRequest recipeRequest, MultipartFile image) {
        User currentUser = userService.getCurrentUser();

        Recipe recipe = new Recipe();
        recipe.setTitle(recipeRequest.getTitle());
        recipe.setDescription(recipeRequest.getDescription());
        recipe.setIngredients(recipeRequest.getIngredients());
        recipe.setSteps(recipeRequest.getSteps());
        recipe.setAuthor(currentUser);

        // Handle image upload
        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.storeFile(image);
            recipe.setImageUrl(imageUrl);
        }

        Recipe savedRecipe = recipeRepository.save(recipe);
        return convertToDto(savedRecipe);
    }

    public RecipeDto updateRecipe(Integer recipeId, RecipeRequest recipeRequest, MultipartFile image) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        User currentUser = userService.getCurrentUser();
        if (!recipe.getAuthor().getUserId().equals(currentUser.getUserId())) {
            throw new RuntimeException("You can only update your own recipes");
        }

        recipe.setTitle(recipeRequest.getTitle());
        recipe.setDescription(recipeRequest.getDescription());
        recipe.setIngredients(recipeRequest.getIngredients());
        recipe.setSteps(recipeRequest.getSteps());

        // Handle image upload
        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.storeFile(image);
            recipe.setImageUrl(imageUrl);
        }

        Recipe updatedRecipe = recipeRepository.save(recipe);
        return convertToDto(updatedRecipe);
    }

    public void deleteRecipe(Integer recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        User currentUser = userService.getCurrentUser();
        if (!recipe.getAuthor().getUserId().equals(currentUser.getUserId())) {
            throw new RuntimeException("You can only delete your own recipes");
        }

        recipeRepository.delete(recipe);
    }

    public RecipeDto getRecipeById(Integer recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
        return convertToDto(recipe);
    }

    public Page<RecipeDto> getAllRecipes(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Recipe> recipes;

        switch (sortBy) {
            case "rating":
                recipes = recipeRepository.findAllOrderByAverageRating(pageable);
                break;
            case "recent":
                recipes = recipeRepository.findAllByOrderByRecipeIdDesc(pageable);
                break;
            default:
                recipes = recipeRepository.findAll(pageable);
        }

        return recipes.map(this::convertToDto);
    }

    public Page<RecipeDto> searchRecipes(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Recipe> recipes = recipeRepository.findByKeyword(keyword, pageable);
        return recipes.map(this::convertToDto);
    }

    public Page<RecipeDto> getRecipesByUser(Integer userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Recipe> recipes = recipeRepository.findByAuthor_UserId(userId, pageable);
        return recipes.map(this::convertToDto);
    }

    private RecipeDto convertToDto(Recipe recipe) {
        UserDto authorDto = new UserDto(
                recipe.getAuthor().getUserId(),
                recipe.getAuthor().getUsername(),
                recipe.getAuthor().getEmail()
        );

        RecipeDto dto = new RecipeDto(
                recipe.getRecipeId(),
                recipe.getTitle(),
                recipe.getDescription(),
                recipe.getIngredients(),
                recipe.getSteps(),
                recipe.getImageUrl(),
                authorDto
        );

        // Add rating and comment statistics
        Double avgRating = ratingRepository.findAverageRatingByRecipeId(recipe.getRecipeId()).orElse(0.0);
        Long totalRatings = ratingRepository.countByRecipe_RecipeId(recipe.getRecipeId());
        Long totalComments = commentRepository.countByRecipe_RecipeId(recipe.getRecipeId());

        dto.setAverageRating(avgRating);
        dto.setTotalRatings(totalRatings.intValue());
        dto.setTotalComments(totalComments.intValue());

        return dto;
    }
}