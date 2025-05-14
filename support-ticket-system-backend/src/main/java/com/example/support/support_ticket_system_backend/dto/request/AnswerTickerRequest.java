package com.example.support.support_ticket_system_backend.dto.request;

import com.example.support.support_ticket_system_backend.enums.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AnswerTickerRequest(
        @NotBlank String response,
        @NotNull Status status) {
}
