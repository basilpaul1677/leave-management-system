package com.leave.management.leave.dto;

public record LeaveBalanceResponse(
        Long id,
        Long employeeId,
        Long leaveTypeId,
        String leaveTypeName,
        Integer allocatedDays,
        Integer usedDays,
        Integer remainingDays,
        Integer year
) 
{
}