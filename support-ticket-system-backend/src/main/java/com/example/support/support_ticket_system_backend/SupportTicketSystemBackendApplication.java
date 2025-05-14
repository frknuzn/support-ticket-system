package com.example.support.support_ticket_system_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SupportTicketSystemBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SupportTicketSystemBackendApplication.class, args);
	}

}
