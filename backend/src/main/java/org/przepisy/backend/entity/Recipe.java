package org.przepisy.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Table(name = "recipes")

public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipeid")
    private Integer recipeId;

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "Ingredients are required")
    @Column(name = "ingredients", columnDefinition = "TEXT", nullable = false)
    private String ingredients;

    @NotBlank(message = "Steps are required")
    @Column(name = "steps", columnDefinition = "TEXT", nullable = false)
    private String steps;

    @Column(name = "imageurl", columnDefinition = "TEXT")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authorid", nullable = false)
    private User author;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Rating> ratings;

    // Constructors
    public Recipe() {}

    public Recipe(String title, String description, String ingredients, String steps, User author) {
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.steps = steps;
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

    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }

    public List<Comment> getComments() { return comments; }
    public void setComments(List<Comment> comments) { this.comments = comments; }

    public List<Rating> getRatings() { return ratings; }
    public void setRatings(List<Rating> ratings) { this.ratings = ratings; }
}
