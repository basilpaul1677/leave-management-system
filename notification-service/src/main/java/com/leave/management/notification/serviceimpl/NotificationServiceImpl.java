package com.leave.management.notification.serviceimpl;

import com.leave.management.notification.dto.CreateNotificationRequest;
import com.leave.management.notification.dto.NotificationResponse;
import com.leave.management.notification.entity.Notification;
import com.leave.management.notification.exception.NotificationNotFoundException;
import com.leave.management.notification.repository.NotificationRepository;
import com.leave.management.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService 
{
    private final NotificationRepository notificationRepository;

    @Override
    public NotificationResponse createNotification(
            CreateNotificationRequest request) 
    {
        Notification notification = Notification.builder()
                .employeeId(request.getEmployeeId())
                .type(request.getType())
                .title(request.getTitle())
                .message(request.getMessage())
                .read(false)
                .build();

        Notification savedNotification =
                notificationRepository.save(notification);

        return mapToResponse(savedNotification);
    }

    @Override
    @Transactional(readOnly = true)
    public NotificationResponse getNotificationById(Long id) 
    {
        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new NotificationNotFoundException(
                                        "Notification not found with id: " + id
                                )
                        );

        return mapToResponse(notification);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getNotificationsByEmployeeId(Long employeeId) 
    {
        return notificationRepository
                .findByEmployeeIdOrderByCreatedAtDesc(employeeId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getUnreadNotificationsByEmployeeId(
            Long employeeId) 
    {
        return notificationRepository
                .findByEmployeeIdAndReadFalseOrderByCreatedAtDesc(employeeId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void markAsRead(Long id) 
    {
        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new NotificationNotFoundException(
                                        "Notification not found with id: " + id
                                )
                        );

        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Override
    public void deleteNotification(Long id) 
    {
        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new NotificationNotFoundException(
                                        "Notification not found with id: " + id
                                )
                        );
        notificationRepository.delete(notification);
    }

    private NotificationResponse mapToResponse(Notification notification) 
    {
        return NotificationResponse.builder()
                .id(notification.getId())
                .employeeId(notification.getEmployeeId())
                .type(notification.getType())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .read(notification.isRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}