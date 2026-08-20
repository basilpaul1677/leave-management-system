package com.leave.management.leave.service;

import com.leave.management.leave.dto.LeaveBalanceResponse;

import java.util.List;

public interface LeaveBalanceService 
{
    List<LeaveBalanceResponse> getEmployeeLeaveBalances(Long employeeId,Integer year);
}