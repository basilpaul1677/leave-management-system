package com.leave.management.leave.serviceimpl;

import com.leave.management.leave.dto.LeaveBalanceResponse;
import com.leave.management.leave.entity.LeaveBalance;
import com.leave.management.leave.repository.LeaveBalanceRepository;
import com.leave.management.leave.service.LeaveBalanceService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaveBalanceServiceImpl implements LeaveBalanceService 
{
    private final LeaveBalanceRepository leaveBalanceRepository;

    @Override
    @Transactional(readOnly = true)
    public List<LeaveBalanceResponse> getEmployeeLeaveBalances(Long employeeId,Integer year) 
    {
        return leaveBalanceRepository
                .findByEmployeeIdAndYear(employeeId, year)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private LeaveBalanceResponse mapToResponse(LeaveBalance leaveBalance) 
    {
        return new LeaveBalanceResponse(
                leaveBalance.getId(),
                leaveBalance.getEmployeeId(),
                leaveBalance.getLeaveType().getId(),
                leaveBalance.getLeaveType().getName(),
                leaveBalance.getAllocatedDays(),
                leaveBalance.getUsedDays(),
                leaveBalance.getAllocatedDays()
                        - leaveBalance.getUsedDays(),
                leaveBalance.getYear()
        );
    }
}