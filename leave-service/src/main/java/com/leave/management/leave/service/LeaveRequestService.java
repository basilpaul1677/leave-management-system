package com.leave.management.leave.service;

import com.leave.management.leave.dto.LeaveApprovalRequest;
import com.leave.management.leave.dto.LeaveRequestCreateRequest;
import com.leave.management.leave.dto.LeaveRequestResponse;

import java.util.List;

public interface LeaveRequestService 
{
    LeaveRequestResponse applyLeave(Long employeeId,LeaveRequestCreateRequest request);

    LeaveRequestResponse getLeaveRequestById(Long id);

    List<LeaveRequestResponse> getEmployeeLeaveHistory(Long employeeId);

    List<LeaveRequestResponse> getManagerPendingRequests(Long managerId);

    LeaveRequestResponse processLeaveRequest(Long requestId,Long managerId,LeaveApprovalRequest request);
}