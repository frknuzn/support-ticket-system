package com.example.support.support_ticket_system_backend.controller;

import com.example.support.support_ticket_system_backend.dto.request.LoginRequest;
import com.example.support.support_ticket_system_backend.dto.request.RegisterRequest;
import com.example.support.support_ticket_system_backend.dto.response.AuthResponse;
import com.example.support.support_ticket_system_backend.dto.response.UserResponse;
import com.example.support.support_ticket_system_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(HttpStatus.CREATED, "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest loginRequest) {
        var authResponse = authService.login(loginRequest);
        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK, "Login successful", authResponse)
        );
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser() {
        UserResponse userResponse = authService.getCurrentUser();
        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK,
                "Current user fetched successfully",
                userResponse
        ));
    }
}