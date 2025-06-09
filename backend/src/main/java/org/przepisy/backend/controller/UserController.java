package org.przepisy.backend.controller;

import org.przepisy.backend.dto.UserDto;
import org.przepisy.backend.dto.response.ApiResponse;
import org.przepisy.backend.entity.User;
import org.przepisy.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5174", maxAge = 3600)
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUser() {
        try {
            User user = userService.getCurrentUser();
            UserDto userDto = new UserDto(user.getUserId(), user.getUsername(), user.getEmail());
            return ResponseEntity.ok(ApiResponse.success("Current user retrieved successfully", userDto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable Integer userId) {
        try {
            UserDto userDto = userService.getUserById(userId);
            return ResponseEntity.ok(ApiResponse.success("User retrieved successfully", userDto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
