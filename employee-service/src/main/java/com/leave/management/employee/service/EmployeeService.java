package com.leave.management.employee.service;

import com.leave.management.employee.dto.EmployeeResponse;
import com.leave.management.employee.dto.UpdateEmployeeRequest;

import java.util.List;

public interface EmployeeService 
{
    EmployeeResponse getEmployeeById(Long id);

    List<EmployeeResponse> getAllEmployees();

    EmployeeResponse updateEmployee(Long id, UpdateEmployeeRequest request);
}