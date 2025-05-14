package com.example.support.support_ticket_system_backend.service;

import com.example.support.support_ticket_system_backend.entity.User;

public interface UserService {
    User getUserByUsername(String username);
}