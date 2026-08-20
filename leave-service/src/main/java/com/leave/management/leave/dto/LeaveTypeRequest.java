package com.leave.management.leave.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LeaveTypeRequest(
        @NotBlank(message = "Leave type name is required")
        String name,

        String description,

        @NotNull(message = "Annual allocation is required")
        @Min(value = 1, message = "Annual allocation must be at least 1")
        Integer annualAllocation
) 
{
}