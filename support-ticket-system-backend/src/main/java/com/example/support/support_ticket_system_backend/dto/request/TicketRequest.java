package com.example.support.support_ticket_system_backend.dto.request;

public record TicketRequest(
        String title,
        String description,
        String category
) {}