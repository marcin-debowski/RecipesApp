package org.przepisy.backend.controller;

import jakarta.validation.Valid;
import org.przepisy.backend.dto.request.AuthRequest;
import org.przepisy.backend.dto.request.RegisterRequest;
import org.przepisy.backend.dto.response.ApiResponse;
import org.przepisy.backend.dto.response.AuthResponse;
import org.przepisy.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5174", maxAge = 3600)
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            AuthResponse authResponse = userService.registerUser(registerRequest);
            return ResponseEntity.ok(ApiResponse.success("User registered successfully", authResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> authenticateUser(@Valid @RequestBody AuthRequest authRequest) {
        try {
            AuthResponse authResponse = userService.authenticateUser(authRequest);
            return ResponseEntity.ok(ApiResponse.success("User authenticated successfully", authResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid email or password"));
        }
    }
}
