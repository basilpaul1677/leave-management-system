package com.leave.management.notification.exception;

public class NotificationNotFoundException extends RuntimeException 
{
    public NotificationNotFoundException(String message) 
    {
        super(message);
    }
}