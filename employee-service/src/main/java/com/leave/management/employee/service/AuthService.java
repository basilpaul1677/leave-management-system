package com.leave.management.employee.service;

import com.leave.management.employee.dto.EmployeeRegistrationRequest;
import com.leave.management.employee.dto.EmployeeResponse;
import com.leave.management.employee.dto.LoginRequest;
import com.leave.management.employee.dto.LoginResponse;

public interface AuthService 
{
    EmployeeResponse register(EmployeeRegistrationRequest request);
 
    LoginResponse login(LoginRequest request);
}