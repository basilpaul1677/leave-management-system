package com.leave.management.leave.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        name = "notification-service",
        url = "${notification-service.url}"
)
public interface NotificationServiceClient {

    @PostMapping("/api/v1/notifications")
    void createNotification(
            @RequestBody NotificationRequest request
    );

    record NotificationRequest(
            Long employeeId,
            String type,
            String title,
            String message
    ) {
    }
}