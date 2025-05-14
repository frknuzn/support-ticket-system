package com.example.support.support_ticket_system_backend.service.impl;

import com.example.support.support_ticket_system_backend.entity.User;
import com.example.support.support_ticket_system_backend.exception.UserNotFoundException;
import com.example.support.support_ticket_system_backend.repository.UserRepository;
import com.example.support.support_ticket_system_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found with username: " + username));
    }
}
