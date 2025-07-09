package org.przepisy.backend.controller;

import jakarta.validation.Valid;
import org.przepisy.backend.dto.CommentDto;
import org.przepisy.backend.dto.request.CommentRequest;
import org.przepisy.backend.dto.response.ApiResponse;
import org.przepisy.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5174", maxAge = 3600)
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/recipes/{recipeId}/comments")
    public ResponseEntity<ApiResponse<CommentDto>> addComment(
            @PathVariable Integer recipeId,
            @Valid @RequestBody CommentRequest commentRequest) {
        try {
            CommentDto commentDto = commentService.addComment(recipeId, commentRequest);
            return ResponseEntity.ok(ApiResponse.success("Comment added successfully", commentDto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<ApiResponse<Void>> deleteComment(@PathVariable Integer commentId) {
        try {
            commentService.deleteComment(commentId);
            return ResponseEntity.ok(ApiResponse.success("Comment deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/recipes/{recipeId}/comments")
    public ResponseEntity<ApiResponse<Page<CommentDto>>> getCommentsByRecipe(
            @PathVariable Integer recipeId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<CommentDto> comments = commentService.getCommentsByRecipe(recipeId, page, size);
            return ResponseEntity.ok(ApiResponse.success("Comments retrieved successfully", comments));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
