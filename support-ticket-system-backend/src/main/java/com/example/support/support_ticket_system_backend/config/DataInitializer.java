package com.example.support.support_ticket_system_backend.config;

import com.example.support.support_ticket_system_backend.entity.User;
import com.example.support.support_ticket_system_backend.enums.Role;
import com.example.support.support_ticket_system_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initAdminUser() {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ROLE_ADMIN);
                userRepository.save(admin);
                System.out.println("✅ Admin user created: admin / admin123");
            } else {
                System.out.println("ℹ️ Admin user already exists");
            }
        };
    }
}