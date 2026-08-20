package com.leave.management.leave.controller;

import com.leave.management.leave.dto.LeaveTypeRequest;
import com.leave.management.leave.dto.LeaveTypeResponse;
import com.leave.management.leave.service.LeaveTypeService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/leave-types")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
public class LeaveTypeController {

    private final LeaveTypeService leaveTypeService;


    // =========================================================
    // ADMIN ONLY
    // =========================================================

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LeaveTypeResponse> createLeaveType(
            @Valid @RequestBody LeaveTypeRequest request) {

        LeaveTypeResponse response =
                leaveTypeService.createLeaveType(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // =========================================================
    // EMPLOYEE / MANAGER / ADMIN
    // =========================================================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'MANAGER', 'ADMIN')")
    public ResponseEntity<LeaveTypeResponse> getLeaveTypeById(
            @PathVariable Long id) {

        LeaveTypeResponse response =
                leaveTypeService.getLeaveTypeById(id);

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // EMPLOYEE / MANAGER / ADMIN
    // =========================================================

    @GetMapping
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'MANAGER', 'ADMIN')")
    public ResponseEntity<List<LeaveTypeResponse>>
    getAllLeaveTypes() {

        List<LeaveTypeResponse> response =
                leaveTypeService.getAllLeaveTypes();

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // ADMIN ONLY
    // =========================================================

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LeaveTypeResponse> updateLeaveType(
            @PathVariable Long id,
            @Valid @RequestBody LeaveTypeRequest request) {

        LeaveTypeResponse response =
                leaveTypeService.updateLeaveType(
                        id,
                        request
                );

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // ADMIN ONLY
    // =========================================================

    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deactivateLeaveType(
            @PathVariable Long id) {

        leaveTypeService.deactivateLeaveType(id);

        return ResponseEntity.noContent().build();
    }
}