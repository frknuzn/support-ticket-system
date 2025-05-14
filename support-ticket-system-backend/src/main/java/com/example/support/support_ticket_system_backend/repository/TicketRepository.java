package com.example.support.support_ticket_system_backend.repository;

import com.example.support.support_ticket_system_backend.enums.Status;
import com.example.support.support_ticket_system_backend.entity.Ticket;
import com.example.support.support_ticket_system_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByUser(User user);
    List<Ticket> findByStatus(Status status);
}
