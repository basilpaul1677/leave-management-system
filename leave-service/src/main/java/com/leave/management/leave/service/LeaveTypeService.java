package com.leave.management.leave.service;

import com.leave.management.leave.dto.LeaveTypeRequest;
import com.leave.management.leave.dto.LeaveTypeResponse;

import java.util.List;

public interface LeaveTypeService 
{
    LeaveTypeResponse createLeaveType(LeaveTypeRequest request);

    LeaveTypeResponse getLeaveTypeById(Long id);

    List<LeaveTypeResponse> getAllLeaveTypes();

    LeaveTypeResponse updateLeaveType(Long id,LeaveTypeRequest request);

    void deactivateLeaveType(Long id);
}