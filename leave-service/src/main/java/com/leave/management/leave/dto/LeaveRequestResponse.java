package com.leave.management.leave.dto;

import com.leave.management.leave.entity.LeaveRequest.Status;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record LeaveRequestResponse(
        Long id,
        Long employeeId,
        Long leaveTypeId,
        String leaveTypeName,
        LocalDate startDate,
        LocalDate endDate,
        Integer numberOfDays,
        String reason,
        Status status,
        Long managerId,
        String managerComment,
        LocalDateTime appliedAt,
        LocalDateTime processedAt
) 
{
}