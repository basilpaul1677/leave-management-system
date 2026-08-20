package com.leave.management.leave.exception;

public class InsufficientLeaveBalanceException extends RuntimeException 
{
    public InsufficientLeaveBalanceException(String message) 
    {
        super(message);
    }
}