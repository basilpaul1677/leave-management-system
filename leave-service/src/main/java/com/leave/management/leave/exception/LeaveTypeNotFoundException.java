package com.leave.management.leave.exception;

public class LeaveTypeNotFoundException extends RuntimeException 
{
    public LeaveTypeNotFoundException(String message) 
    {
        super(message);
    }
}