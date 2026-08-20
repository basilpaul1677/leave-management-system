package com.leave.management.notification.security;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                // REST API is stateless
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // =================================================
                        // SWAGGER / OPENAPI
                        // =================================================

                        .requestMatchers(
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // =================================================
                        // ACTUATOR
                        // =================================================

                        .requestMatchers(
                                "/actuator/health",
                                "/actuator/info"
                        ).permitAll()

                        // =================================================
                        // NOTIFICATION APIs
                        // =================================================

                        // Creating notifications is an internal/admin
                        // operation. We will handle service-to-service
                        // authentication separately.
                        .requestMatchers(
                                org.springframework.http.HttpMethod.POST,
                                "/api/v1/notifications"
                        ).hasAnyRole(
                                "ADMIN",
                                "HR",
                                "MANAGER"
                        )

                        // Read notification
                        .requestMatchers(
                                org.springframework.http.HttpMethod.GET,
                                "/api/v1/notifications/**"
                        ).hasAnyRole(
                                "EMPLOYEE",
                                "MANAGER",
                                "HR",
                                "ADMIN"
                        )

                        // Mark notification as read
                        .requestMatchers(
                                org.springframework.http.HttpMethod.PATCH,
                                "/api/v1/notifications/*/read"
                        ).hasAnyRole(
                                "EMPLOYEE",
                                "MANAGER",
                                "HR",
                                "ADMIN"
                        )

                        // Delete notification
                        .requestMatchers(
                                org.springframework.http.HttpMethod.DELETE,
                                "/api/v1/notifications/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "HR"
                        )

                        // Everything else requires authentication
                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}