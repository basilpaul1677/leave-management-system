package com.leave.management.leave.dto;

import com.leave.management.leave.entity.LeaveRequest.Status;

import jakarta.validation.constraints.NotNull;

public record LeaveApprovalRequest(
        @NotNull(message = "Approval status is required")
        Status status,
        String managerComment
) 
{
}