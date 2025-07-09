package org.przepisy.backend.dto;

import java.time.LocalDateTime;

public class CommentDto {
    private Integer commentId;
    private String content;
    private UserDto user;
    private LocalDateTime dataCreated;

    // Constructors
    public CommentDto() {}

    public CommentDto(Integer commentId, String content, UserDto user, LocalDateTime dataCreated) {
        this.commentId = commentId;
        this.content = content;
        this.user = user;
        this.dataCreated = dataCreated;
    }

    // Getters and Setters
    public Integer getCommentId() { return commentId; }
    public void setCommentId(Integer commentId) { this.commentId = commentId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }

    public LocalDateTime getDataCreated() { return dataCreated; }
    public void setDataCreated(LocalDateTime dataCreated) { this.dataCreated = dataCreated; }
}