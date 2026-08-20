package com.leave.management.employee.controller;

import com.leave.management.employee.dto.EmployeeRegistrationRequest;
import com.leave.management.employee.dto.EmployeeResponse;
import com.leave.management.employee.dto.LoginRequest;
import com.leave.management.employee.dto.LoginResponse;
import com.leave.management.employee.service.AuthService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController 
{
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<EmployeeResponse> register(
            @Valid @RequestBody EmployeeRegistrationRequest request) 
    {
        EmployeeResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) 
    {
        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }
}