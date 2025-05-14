package com.example.support.support_ticket_system_backend.mapper;

import com.example.support.support_ticket_system_backend.dto.response.TicketResponse;
import com.example.support.support_ticket_system_backend.entity.Ticket;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TicketMapper {
    @Mapping(source = "user.username", target = "username")
    TicketResponse toDto(Ticket ticket);
}
