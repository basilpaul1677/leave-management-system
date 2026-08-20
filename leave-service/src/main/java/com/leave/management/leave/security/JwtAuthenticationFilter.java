package com.leave.management.leave.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader =
                request.getHeader("Authorization");

        System.out.println("========================================");
        System.out.println("JWT FILTER");
        System.out.println("Request: "
                + request.getMethod()
                + " "
                + request.getRequestURI());

        System.out.println("Authorization Header Present: "
                + (authorizationHeader != null));

        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Bearer ")) {

            System.out.println("JWT: Authorization header missing/invalid");
            System.out.println("========================================");

            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.substring(7);

        System.out.println("JWT: Bearer token received");

        if (!jwtService.isTokenValid(token)) {

            System.out.println("JWT: TOKEN INVALID");

            System.out.println("========================================");

            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("JWT: TOKEN VALID");

        String email = jwtService.extractEmail(token);
        String role = jwtService.extractRole(token);

        System.out.println("JWT Email: " + email);
        System.out.println("JWT Role: " + role);

        if (SecurityContextHolder.getContext().getAuthentication() == null) {

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            List.of(
                                    new SimpleGrantedAuthority(
                                            "ROLE_" + role
                                    )
                            )
                    );

            authentication.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request)
            );

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);

            System.out.println(
                    "SecurityContext: Authentication SET"
            );
        }

        System.out.println("========================================");

        filterChain.doFilter(request, response);
    }
}