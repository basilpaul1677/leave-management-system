package com.leave.management.leave.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "employee-service",
        url = "${employee-service.url}"
)
public interface EmployeeServiceClient 
{
    @GetMapping("/api/v1/employees/{id}")
    EmployeeResponse getEmployeeById(@PathVariable Long id);

    record EmployeeResponse(
            Long id,
            String employeeCode,
            String firstName,
            String lastName,
            String email,
            String department,
            String role,
            Long managerId,
            String joiningDate,
            Boolean active
    ) 
    {
    }
}