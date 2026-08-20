package com.leave.management.employee.dto;

public record LoginResponse(
        String accessToken,
        String tokenType,
        Long employeeId,
        String employeeCode,
        String email,
        String role
) 
{
}