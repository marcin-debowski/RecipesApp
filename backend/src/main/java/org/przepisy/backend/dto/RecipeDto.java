package org.przepisy.backend.dto;

public class RecipeDto {
    private Integer recipeId;
    private String title;
    private String description;
    private String ingredients;
    private String steps;
    private String imageUrl;
    private UserDto author;
    private Double averageRating;
    private Integer totalRatings;
    private Integer totalComments;

    // Constructors
    public RecipeDto() {}

    public RecipeDto(Integer recipeId, String title, String description, String ingredients,
                     String steps, String imageUrl, UserDto author) {
        this.recipeId = recipeId;
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.steps = steps;
        this.imageUrl = imageUrl;
        this.author = author;
    }

    // Getters and Setters
    public Integer getRecipeId() { return recipeId; }
    public void setRecipeId(Integer recipeId) { this.recipeId = recipeId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIngredients() { return ingredients; }
    public void setIngredients(String ingredients) { this.ingredients = ingredients; }

    public String getSteps() { return steps; }
    public void setSteps(String steps) { this.steps = steps; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public UserDto getAuthor() { return author; }
    public void setAuthor(UserDto author) { this.author = author; }

    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }

    public Integer getTotalRatings() { return totalRatings; }
    public void setTotalRatings(Integer totalRatings) { this.totalRatings = totalRatings; }

    public Integer getTotalComments() { return totalComments; }
    public void setTotalComments(Integer totalComments) { this.totalComments = totalComments; }
}