package com.leave.management.employee.serviceimpl;

import com.leave.management.employee.dto.EmployeeResponse;
import com.leave.management.employee.dto.UpdateEmployeeRequest;
import com.leave.management.employee.entity.Employee;
import com.leave.management.employee.exception.DuplicateEmployeeException;
import com.leave.management.employee.exception.EmployeeNotFoundException;
import com.leave.management.employee.repository.EmployeeRepository;
import com.leave.management.employee.service.EmployeeService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public EmployeeResponse getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(
                        "Employee not found with id: " + id
                ));

        return mapToEmployeeResponse(employee);
    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map(this::mapToEmployeeResponse)
                .toList();
    }

    @Override
    public EmployeeResponse updateEmployee(
            Long id,
            UpdateEmployeeRequest request
    ) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(
                        "Employee not found with id: " + id
                ));

        if (!employee.getEmail().equalsIgnoreCase(request.email())
                && employeeRepository.existsByEmail(request.email())) {

            throw new DuplicateEmployeeException(
                    "Employee with email already exists: " + request.email()
            );
        }

        employee.setFirstName(request.firstName());
        employee.setLastName(request.lastName());
        employee.setEmail(request.email());
        employee.setDepartment(request.department());
        employee.setManagerId(request.managerId());

        Employee updatedEmployee = employeeRepository.save(employee);

        return mapToEmployeeResponse(updatedEmployee);
    }

    private EmployeeResponse mapToEmployeeResponse(Employee employee) {

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