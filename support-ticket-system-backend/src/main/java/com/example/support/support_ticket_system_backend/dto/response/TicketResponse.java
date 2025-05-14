package com.example.support.support_ticket_system_backend.dto.response;

import com.example.support.support_ticket_system_backend.enums.Status;

import java.time.LocalDateTime;

public record TicketResponse(
        Long id,
        String title,
        String description,
        String category,
        Status status,
        String adminResponse,
        LocalDateTime createdAt,
        String username
) {}