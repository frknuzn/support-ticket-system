package com.example.support.support_ticket_system_backend.controller;


import org.springframework.http.HttpStatus;

public record ApiResponse<T>(
        int status,
        String message,
        T data
) {
    public ApiResponse(HttpStatus status, String message) {
        this(status, message, null);
    }

    public ApiResponse(HttpStatus status, String message, T data) {
        this(status.value(), message, data);
    }
}