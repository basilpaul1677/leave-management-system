package com.leave.management.leave.controller;

import com.leave.management.leave.dto.LeaveBalanceResponse;
import com.leave.management.leave.service.LeaveBalanceService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/leave-balances")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
public class LeaveBalanceController {

    private final LeaveBalanceService leaveBalanceService;


    // =========================================================
    // EMPLOYEE / MANAGER / ADMIN
    // =========================================================

    @GetMapping("/{employeeId}")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'MANAGER', 'ADMIN')")
    public ResponseEntity<List<LeaveBalanceResponse>>
    getEmployeeLeaveBalances(
            @PathVariable Long employeeId,
            @RequestParam Integer year) {

        List<LeaveBalanceResponse> response =
                leaveBalanceService
                        .getEmployeeLeaveBalances(
                                employeeId,
                                year
                        );

        return ResponseEntity.ok(response);
    }
}