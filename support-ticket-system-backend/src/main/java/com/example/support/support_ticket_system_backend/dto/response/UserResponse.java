package com.example.support.support_ticket_system_backend.dto.response;

public record UserResponse(
        Long id,
        String username,
        String role
) {}