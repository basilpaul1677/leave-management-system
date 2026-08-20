package com.leave.management.employee.dto;

import java.time.LocalDate;

public record EmployeeResponse(
        Long id,
        String employeeCode,
        String firstName,
        String lastName,
        String email,
        String department,
        String role,
        Long managerId,
        LocalDate joiningDate,
        Boolean active
) 
{
}