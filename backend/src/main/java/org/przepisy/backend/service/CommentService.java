package org.przepisy.backend.service;

import org.przepisy.backend.dto.CommentDto;
import org.przepisy.backend.dto.UserDto;
import org.przepisy.backend.entity.Comment;
import org.przepisy.backend.entity.Recipe;
import org.przepisy.backend.entity.User;
import org.przepisy.backend.repository.CommentRepository;
import org.przepisy.backend.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.przepisy.backend.dto.request.CommentRequest;

@Service
@Transactional
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserService userService;

    public CommentDto addComment(Integer recipeId, CommentRequest commentRequest) {
        User currentUser = userService.getCurrentUser();
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setUser(currentUser);
        comment.setRecipe(recipe);

        Comment savedComment = commentRepository.save(comment);
        return convertToDto(savedComment);
    }

    public void deleteComment(Integer commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        User currentUser = userService.getCurrentUser();
        if (!comment.getUser().getUserId().equals(currentUser.getUserId())) {
            throw new RuntimeException("You can only delete your own comments");
        }

        commentRepository.delete(comment);
    }

    public Page<CommentDto> getCommentsByRecipe(Integer recipeId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Comment> comments = commentRepository.findByRecipe_RecipeIdOrderByDataCreatedDesc(recipeId, pageable);
        return comments.map(this::convertToDto);
    }

    private CommentDto convertToDto(Comment comment) {
        UserDto userDto = new UserDto(
                comment.getUser().getUserId(),
                comment.getUser().getUsername(),
                comment.getUser().getEmail()
        );

        return new CommentDto(
                comment.getCommentId(),
                comment.getContent(),
                userDto,
                comment.getDataCreated()
        );
    }
}
