package com.example.support.support_ticket_system_backend.dto.response;


import com.example.support.support_ticket_system_backend.enums.Role;

public record AuthResponse(
        String token,
        Long id,
        String username,
        Role role
) {}