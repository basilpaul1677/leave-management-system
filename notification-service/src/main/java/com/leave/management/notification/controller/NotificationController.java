package com.leave.management.notification.controller;

import com.leave.management.notification.dto.CreateNotificationRequest;
import com.leave.management.notification.dto.NotificationResponse;
import com.leave.management.notification.service.NotificationService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<NotificationResponse> createNotification(
            @Valid @RequestBody CreateNotificationRequest request
    ) {

        NotificationResponse response =
                notificationService.createNotification(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotificationResponse> getNotificationById(
            @PathVariable Long id
    ) {

        NotificationResponse response =
                notificationService.getNotificationById(id);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<NotificationResponse>>
    getNotificationsByEmployeeId(
            @PathVariable Long employeeId
    ) {

        List<NotificationResponse> response =
                notificationService
                        .getNotificationsByEmployeeId(employeeId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/employee/{employeeId}/unread")
    public ResponseEntity<List<NotificationResponse>>
    getUnreadNotificationsByEmployeeId(
            @PathVariable Long employeeId
    ) {

        List<NotificationResponse> response =
                notificationService
                        .getUnreadNotificationsByEmployeeId(
                                employeeId
                        );

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(
            @PathVariable Long id
    ) {

        notificationService.markAsRead(id);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(
            @PathVariable Long id
    ) {

        notificationService.deleteNotification(id);

        return ResponseEntity.noContent().build();
    }
}