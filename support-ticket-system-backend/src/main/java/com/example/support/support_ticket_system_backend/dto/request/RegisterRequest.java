package com.example.support.support_ticket_system_backend.dto.request;

import com.example.support.support_ticket_system_backend.enums.Role;

public record RegisterRequest(String username, String password, Role role) {
}
