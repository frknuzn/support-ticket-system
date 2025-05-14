
package com.example.support.support_ticket_system_backend.service.impl;

import com.example.support.support_ticket_system_backend.dto.request.LoginRequest;
import com.example.support.support_ticket_system_backend.dto.request.RegisterRequest;
import com.example.support.support_ticket_system_backend.dto.response.AuthResponse;
import com.example.support.support_ticket_system_backend.dto.response.UserResponse;
import com.example.support.support_ticket_system_backend.entity.User;
import com.example.support.support_ticket_system_backend.enums.Role;
import com.example.support.support_ticket_system_backend.exception.UserAlreadyExistsException;
import com.example.support.support_ticket_system_backend.exception.UserNotFoundException;
import com.example.support.support_ticket_system_backend.repository.UserRepository;
import com.example.support.support_ticket_system_backend.security.JwtUtil;
import com.example.support.support_ticket_system_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    public void register(RegisterRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.ROLE_USER)
                .build();
        userRepository.save(user);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );

        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        String token = jwtUtil.generateToken(
                new org.springframework.security.core.userdetails.User(
                        user.getUsername(),
                        user.getPassword(),
                        java.util.Collections.singletonList(user.getRole())
                )
        );

        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getRole()
        );
    }

    @Override
    public UserResponse getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UserNotFoundException("User not authenticated");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getRole().name().replace("ROLE_", "")
        );
    }
}