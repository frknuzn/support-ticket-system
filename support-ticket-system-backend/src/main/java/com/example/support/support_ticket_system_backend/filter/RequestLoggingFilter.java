package com.example.support.support_ticket_system_backend.filter;


import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class RequestLoggingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        log.info("Incoming request: method={} uri={} remoteAddr={}",
                req.getMethod(),
                req.getRequestURI(),
                req.getRemoteAddr()
        );

        chain.doFilter(request, response);

        log.info("Outgoing response for uri={}", req.getRequestURI());
    }
}
