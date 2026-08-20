package com.leave.management.leave.exception;

public class LeaveRequestNotFoundException extends RuntimeException 
{
    public LeaveRequestNotFoundException(String message) 
    {
        super(message);
    }
}