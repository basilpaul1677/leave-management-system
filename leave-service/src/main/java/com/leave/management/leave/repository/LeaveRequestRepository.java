package com.leave.management.leave.repository;

import com.leave.management.leave.entity.LeaveRequest;
import com.leave.management.leave.entity.LeaveRequest.Status;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> 
{
    List<LeaveRequest> findByEmployeeIdOrderByAppliedAtDesc(Long employeeId);

    List<LeaveRequest> findByManagerIdAndStatus(
                                Long managerId,Status status);

    Optional<LeaveRequest> findByIdAndEmployeeId(
                                Long id,Long employeeId);
}