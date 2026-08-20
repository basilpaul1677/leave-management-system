package com.leave.management.notification.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateNotificationRequest 
{
    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    @NotBlank(message = "Notification type is required")
    @Size(max = 50, message = "Notification type must not exceed 50 characters")
    private String type;

    @NotBlank(message = "Notification title is required")
    @Size(max = 150, message = "Notification title must not exceed 150 characters")
    private String title;

    @NotBlank(message = "Notification message is required")
    @Size(max = 500, message = "Notification message must not exceed 500 characters")
    private String message;
}