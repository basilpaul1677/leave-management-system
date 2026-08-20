package com.leave.management.leave.controller;

import com.leave.management.leave.dto.LeaveApprovalRequest;
import com.leave.management.leave.dto.LeaveRequestCreateRequest;
import com.leave.management.leave.dto.LeaveRequestResponse;
import com.leave.management.leave.service.LeaveRequestService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/leave-requests")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;


    // =========================================================
    // EMPLOYEE - APPLY LEAVE
    // =========================================================

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<LeaveRequestResponse> applyLeave(
            @RequestParam Long employeeId,
            @Valid @RequestBody LeaveRequestCreateRequest request) {

        LeaveRequestResponse response =
                leaveRequestService.applyLeave(
                        employeeId,
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // =========================================================
    // EMPLOYEE / MANAGER / ADMIN
    // =========================================================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'MANAGER', 'ADMIN')")
    public ResponseEntity<LeaveRequestResponse> getLeaveRequestById(
            @PathVariable Long id) {

        LeaveRequestResponse response =
                leaveRequestService.getLeaveRequestById(id);

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // EMPLOYEE / MANAGER / ADMIN
    // =========================================================

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'MANAGER', 'ADMIN')")
    public ResponseEntity<List<LeaveRequestResponse>>
    getEmployeeLeaveHistory(
            @PathVariable Long employeeId) {

        List<LeaveRequestResponse> response =
                leaveRequestService
                        .getEmployeeLeaveHistory(employeeId);

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // MANAGER / ADMIN
    // =========================================================

    @GetMapping("/manager/{managerId}/pending")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public ResponseEntity<List<LeaveRequestResponse>>
    getManagerPendingRequests(
            @PathVariable Long managerId) {

        List<LeaveRequestResponse> response =
                leaveRequestService
                        .getManagerPendingRequests(managerId);

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // MANAGER / ADMIN
    // =========================================================

    @PutMapping("/{requestId}/process")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public ResponseEntity<LeaveRequestResponse>
    processLeaveRequest(
            @PathVariable Long requestId,
            @RequestParam Long managerId,
            @Valid @RequestBody LeaveApprovalRequest request) {

        LeaveRequestResponse response =
                leaveRequestService.processLeaveRequest(
                        requestId,
                        managerId,
                        request
                );

        return ResponseEntity.ok(response);
    }
}