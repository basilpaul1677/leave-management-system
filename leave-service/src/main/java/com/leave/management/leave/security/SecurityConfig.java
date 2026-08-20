package com.leave.management.leave.security;

import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    // =========================================================
    // SECURITY FILTER CHAIN
    // =========================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // =================================================
                // CSRF
                // =================================================

                .csrf(csrf -> csrf.disable())


                // =================================================
                // SESSION MANAGEMENT
                // =================================================

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // =================================================
                // EXCEPTION HANDLING
                // =================================================

                .exceptionHandling(exception -> exception

                        // -----------------------------------------
                        // 403 FORBIDDEN
                        // Authenticated user does not have
                        // required role/permission
                        // -----------------------------------------

                        .accessDeniedHandler(
                                (request,
                                 response,
                                 accessDeniedException) -> {

                                    response.setStatus(
                                            HttpServletResponse.SC_FORBIDDEN
                                    );

                                    response.setContentType(
                                            "application/json"
                                    );

                                    response.getWriter().write(
                                            """
                                            {
                                              "status": 403,
                                              "error": "Forbidden",
                                              "message": "Access denied",
                                              "path": "%s"
                                            }
                                            """.formatted(
                                                    request.getRequestURI()
                                            )
                                    );
                                }
                        )


                        // -----------------------------------------
                        // 401 UNAUTHORIZED
                        // User is not authenticated
                        // -----------------------------------------

                        .authenticationEntryPoint(
                                (request,
                                 response,
                                 authenticationException) -> {

                                    response.setStatus(
                                            HttpServletResponse.SC_UNAUTHORIZED
                                    );

                                    response.setContentType(
                                            "application/json"
                                    );

                                    response.getWriter().write(
                                            """
                                            {
                                              "status": 401,
                                              "error": "Unauthorized",
                                              "message": "Authentication is required",
                                              "path": "%s"
                                            }
                                            """.formatted(
                                                    request.getRequestURI()
                                            )
                                    );
                                }
                        )
                )


                // =================================================
                // AUTHORIZATION
                // =================================================

                .authorizeHttpRequests(auth -> auth


                        // -----------------------------------------
                        // SWAGGER / OPENAPI
                        // -----------------------------------------

                        .requestMatchers(
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()


                        // -----------------------------------------
                        // ACTUATOR
                        // -----------------------------------------

                        .requestMatchers(
                                "/actuator/health",
                                "/actuator/info"
                        ).permitAll()


                        // -----------------------------------------
                        // ALL BUSINESS APIs
                        // Require JWT authentication
                        // -----------------------------------------

                        .anyRequest().authenticated()
                )


                // =================================================
                // JWT AUTHENTICATION FILTER
                // =================================================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }
}