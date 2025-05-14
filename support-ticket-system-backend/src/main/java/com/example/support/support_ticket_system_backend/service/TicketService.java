package com.example.support.support_ticket_system_backend.service;

import com.example.support.support_ticket_system_backend.dto.request.TicketRequest;
import com.example.support.support_ticket_system_backend.dto.response.TicketResponse;
import com.example.support.support_ticket_system_backend.enums.Status;

import java.security.Principal;
import java.util.List;

public interface TicketService {

    TicketResponse createTicket(TicketRequest request, String username);

    List<TicketResponse> getMyTickets(String username);

    List<TicketResponse> getAllTicketsByStatus(String status);

    TicketResponse answerTicket(Long ticketId, String adminResponse, Status newStatus);
}

