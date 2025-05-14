package com.example.support.support_ticket_system_backend.service.impl;

import com.example.support.support_ticket_system_backend.dto.request.TicketRequest;
import com.example.support.support_ticket_system_backend.dto.response.TicketResponse;
import com.example.support.support_ticket_system_backend.enums.Status;
import com.example.support.support_ticket_system_backend.entity.Ticket;
import com.example.support.support_ticket_system_backend.entity.User;
import com.example.support.support_ticket_system_backend.exception.TicketNotFoundException;
import com.example.support.support_ticket_system_backend.mapper.TicketMapper;
import com.example.support.support_ticket_system_backend.repository.TicketRepository;
import com.example.support.support_ticket_system_backend.service.TicketService;
import com.example.support.support_ticket_system_backend.service.UserService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;

    private final UserService userService;

    private final TicketMapper ticketMapper;

    @RateLimiter(name = "ticketService")
    @CacheEvict(value = "ticketsByStatus", allEntries = true)
    @Override
    public TicketResponse createTicket(TicketRequest request, String username) {
        User user = userService.getUserByUsername(username);

        var ticket = Ticket.builder()
                .title(request.title())
                .description(request.description())
                .category(request.category())
                .status(Status.OPEN)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        ticketRepository.save(ticket);
        return ticketMapper.toDto(ticket);
    }

    @Override
    public List<TicketResponse> getMyTickets(String username) {
        User user = userService.getUserByUsername(username);

        return ticketRepository.findByUser(user)
                .stream()
                .map(ticketMapper::toDto)
                .collect(Collectors.toList());
    }

    @RateLimiter(name = "ticketService")
    @Cacheable(value = "ticketsByStatus", key = "#status")
    @Override
    public List<TicketResponse> getAllTicketsByStatus(String status) {
        Status enumStatus = Status.valueOf(status);
        return ticketRepository.findByStatus(enumStatus)
                .stream()
                .map(ticketMapper::toDto)
                .collect(Collectors.toList());
    }

    @CacheEvict(value = "ticketsByStatus", allEntries = true)
    @Override
    public TicketResponse answerTicket(Long ticketId, String adminResponse, Status newStatus) {
        var ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new TicketNotFoundException("Ticket not found with id: " + ticketId));

        ticket.setAdminResponse(adminResponse);
        ticket.setStatus(newStatus);
        ticketRepository.save(ticket);

        return ticketMapper.toDto(ticket);
    }
}
