package com.leave.management.leave.exception;

public class DuplicateLeaveTypeException extends RuntimeException 
{
    public DuplicateLeaveTypeException(String message) 
    {
        super(message);
    }
}