package org.przepisy.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commentid")
    private Integer commentId;

    @NotBlank(message = "Comment content is required")
    @Size(max = 1000, message = "Comment cannot exceed 1000 characters")
    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipeid", nullable = false)
    private Recipe recipe;

    @Column(name = "datecreated", nullable = false)
    private LocalDateTime dataCreated;

    @PrePersist
    protected void onCreate() {
        dataCreated = LocalDateTime.now();
    }

    // Constructors
    public Comment() {}

    public Comment(String content, User user, Recipe recipe) {
        this.content = content;
        this.user = user;
        this.recipe = recipe;
    }

    // Getters and Setters
    public Integer getCommentId() { return commentId; }
    public void setCommentId(Integer commentId) { this.commentId = commentId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Recipe getRecipe() { return recipe; }
    public void setRecipe(Recipe recipe) { this.recipe = recipe; }

    public LocalDateTime getDataCreated() { return dataCreated; }
    public void setDataCreated(LocalDateTime dataCreated) { this.dataCreated = dataCreated; }
}
