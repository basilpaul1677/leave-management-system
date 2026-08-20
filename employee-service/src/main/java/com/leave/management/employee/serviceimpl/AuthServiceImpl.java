package com.leave.management.employee.serviceimpl;

import com.leave.management.employee.dto.EmployeeRegistrationRequest;
import com.leave.management.employee.dto.EmployeeResponse;
import com.leave.management.employee.dto.LoginRequest;
import com.leave.management.employee.dto.LoginResponse;
import com.leave.management.employee.entity.Employee;
import com.leave.management.employee.exception.DuplicateEmployeeException;
import com.leave.management.employee.repository.EmployeeRepository;
import com.leave.management.employee.security.JwtService;
import com.leave.management.employee.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService 
{
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public EmployeeResponse register(EmployeeRegistrationRequest request) 
    {

        if (employeeRepository.existsByEmail(request.email())) 
        {
            throw new DuplicateEmployeeException(
                    "Employee with email id already exists: " + request.email());
        }

        if (employeeRepository.existsByEmployeeCode(request.employeeCode())) 
        {
            throw new DuplicateEmployeeException(
                    "Employee with employee code already exists: "
                            + request.employeeCode());
        }

        Employee employee = Employee.builder()
                .employeeCode(request.employeeCode())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .department(request.department())
                .role(Employee.Role.valueOf(request.role().name()))
                .managerId(request.managerId())
                .joiningDate(request.joiningDate())
                .active(true)
                .build();

        Employee savedEmployee = employeeRepository.save(employee);
        return mapToEmployeeResponse(savedEmployee);
    }

    @Override
    public LoginResponse login(LoginRequest request) 
    {
        Employee employee = employeeRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid email or password"));

        if (!employee.getActive()) 
        {
            throw new IllegalArgumentException(
                    "Employee account is inactive");
        }

        if (!passwordEncoder.matches(
                request.password(),employee.getPassword())) 
        {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtService.generateToken(employee.getEmail(),employee.getRole().name());

        return new LoginResponse(
                token,
                "Bearer",
                employee.getId(),
                employee.getEmployeeCode(),
                employee.getEmail(),
                employee.getRole().name()
        );
    }

    private EmployeeResponse mapToEmployeeResponse(Employee employee) 
    {
        return new EmployeeResponse(
                employee.getId(),
                employee.getEmployeeCode(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getDepartment(),
                employee.getRole().name(),
                employee.getManagerId(),
                employee.getJoiningDate(),
                employee.getActive()
        );
    }
}