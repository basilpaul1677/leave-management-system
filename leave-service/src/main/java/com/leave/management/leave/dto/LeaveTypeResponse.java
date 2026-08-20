package com.leave.management.leave.dto;

public record LeaveTypeResponse(
        Long id,
        String name,
        String description,
        Integer annualAllocation,
        Boolean active
) 
{
}