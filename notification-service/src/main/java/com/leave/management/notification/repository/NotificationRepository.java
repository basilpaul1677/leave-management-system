package com.leave.management.notification.repository;

import com.leave.management.notification.entity.Notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository
        extends JpaRepository<Notification, Long> 
{
    List<Notification> findByEmployeeIdOrderByCreatedAtDesc(Long employeeId);

    List<Notification> findByEmployeeIdAndReadFalseOrderByCreatedAtDesc(Long employeeId);
}