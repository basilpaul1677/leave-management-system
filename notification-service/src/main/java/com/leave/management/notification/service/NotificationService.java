package com.leave.management.notification.service;

import com.leave.management.notification.dto.CreateNotificationRequest;
import com.leave.management.notification.dto.NotificationResponse;

import java.util.List;

public interface NotificationService 
{
    NotificationResponse createNotification(CreateNotificationRequest request);

    NotificationResponse getNotificationById(Long id);

    List<NotificationResponse> getNotificationsByEmployeeId(Long employeeId);

    List<NotificationResponse> getUnreadNotificationsByEmployeeId(Long employeeId);

    void markAsRead(Long id);

    void deleteNotification(Long id);
}