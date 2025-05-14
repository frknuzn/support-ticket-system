
package com.example.support.support_ticket_system_backend.service;

import com.example.support.support_ticket_system_backend.dto.request.LoginRequest;
import com.example.support.support_ticket_system_backend.dto.request.RegisterRequest;
import com.example.support.support_ticket_system_backend.dto.response.AuthResponse;
import com.example.support.support_ticket_system_backend.dto.response.UserResponse;

public interface AuthService {
    void register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    UserResponse getCurrentUser();
}