package com.example.support.support_ticket_system_backend.controller;

import com.example.support.support_ticket_system_backend.dto.request.AnswerTickerRequest;
import com.example.support.support_ticket_system_backend.dto.request.TicketRequest;
import com.example.support.support_ticket_system_backend.dto.response.TicketResponse;
import com.example.support.support_ticket_system_backend.enums.Status;
import com.example.support.support_ticket_system_backend.service.TicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping
    public ResponseEntity<ApiResponse<TicketResponse>> createTicket(@RequestBody TicketRequest request,
                                                                    Principal principal) {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Success"
                , ticketService.createTicket(request, principal.getName())));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<TicketResponse>>> getMyTickets(Principal principal) {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Success",
                ticketService.getMyTickets(principal.getName())));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<TicketResponse>>> getTicketsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.OK, "Tickets by status",
                        ticketService.getAllTicketsByStatus(status.toUpperCase().trim()))
        );
    }

    @PutMapping("/{ticketId}/answer")
    public ResponseEntity<ApiResponse<TicketResponse>> answerTicket(
            @PathVariable Long ticketId,
            @Valid @RequestBody AnswerTickerRequest request
    ) {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Success",
                ticketService.answerTicket(ticketId, request.response(), request.status()))
        );
    }
}
