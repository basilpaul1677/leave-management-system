package com.leave.management.gateway.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(
            ServerHttpSecurity http) {

        return http
                // Disable CSRF because this is a stateless REST API gateway
                .csrf(ServerHttpSecurity.CsrfSpec::disable)

                // Disable Spring Security default login mechanisms
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)

                // Gateway does not authenticate users.
                // Authentication is handled by downstream services.
                .authorizeExchange(exchange -> exchange

                        // Swagger / OpenAPI
                        .pathMatchers(
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // Actuator
                        .pathMatchers(
                                "/actuator/health",
                                "/actuator/info"
                        ).permitAll()

                        // All API requests are forwarded to downstream
                        // services where JWT authentication is performed.
                        .anyExchange().permitAll()
                )

                .build();
    }
}