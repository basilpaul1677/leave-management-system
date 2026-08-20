package com.leave.management.leave.serviceimpl;

import com.leave.management.leave.client.NotificationServiceClient;
import com.leave.management.leave.dto.LeaveApprovalRequest;
import com.leave.management.leave.dto.LeaveRequestCreateRequest;
import com.leave.management.leave.dto.LeaveRequestResponse;
import com.leave.management.leave.entity.LeaveBalance;
import com.leave.management.leave.entity.LeaveRequest;
import com.leave.management.leave.entity.LeaveType;
import com.leave.management.leave.repository.LeaveBalanceRepository;
import com.leave.management.leave.repository.LeaveRequestRepository;
import com.leave.management.leave.repository.LeaveTypeRepository;
import com.leave.management.leave.service.LeaveRequestService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LeaveRequestServiceImpl implements LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;

    private final LeaveTypeRepository leaveTypeRepository;

    private final LeaveBalanceRepository leaveBalanceRepository;

    private final NotificationServiceClient notificationServiceClient;


    // =========================================================
    // APPLY LEAVE
    // =========================================================

    @Override
    public LeaveRequestResponse applyLeave(
            Long employeeId,
            LeaveRequestCreateRequest request) {

        validateDates(
                request.startDate(),
                request.endDate()
        );

        LeaveType leaveType =
                leaveTypeRepository
                        .findById(request.leaveTypeId())
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Leave type not found with id: "
                                                + request.leaveTypeId()
                                )
                        );

        if (!leaveType.getActive()) {

            throw new IllegalArgumentException(
                    "Leave type is inactive"
            );
        }

        int numberOfDays =
                calculateNumberOfDays(
                        request.startDate(),
                        request.endDate()
                );

        int year =
                request.startDate().getYear();

        LeaveBalance leaveBalance =
                leaveBalanceRepository
                        .findByEmployeeIdAndLeaveTypeIdAndYear(
                                employeeId,
                                request.leaveTypeId(),
                                year
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Leave balance not found for employee"
                                )
                        );

        int remainingDays =
                leaveBalance.getAllocatedDays()
                        - leaveBalance.getUsedDays();

        if (numberOfDays > remainingDays) {

            throw new IllegalArgumentException(
                    "Insufficient leave balance. "
                            + "Available: " + remainingDays
                            + ", Requested: " + numberOfDays
            );
        }

        LeaveRequest leaveRequest =
                LeaveRequest.builder()
                        .employeeId(employeeId)
                        .leaveType(leaveType)
                        .startDate(request.startDate())
                        .endDate(request.endDate())
                        .numberOfDays(numberOfDays)
                        .reason(request.reason())
                        .status(LeaveRequest.Status.PENDING)
                        .appliedAt(LocalDateTime.now())
                        .build();

        LeaveRequest savedRequest =
                leaveRequestRepository.save(leaveRequest);


        // =====================================================
        // SEND NOTIFICATION
        // =====================================================

        NotificationServiceClient.NotificationRequest
                notificationRequest =
                new NotificationServiceClient.NotificationRequest(
                        savedRequest.getEmployeeId(),
                        "LEAVE_APPLIED",
                        "Leave Request Submitted",
                        "Your leave request from "
                                + savedRequest.getStartDate()
                                + " to "
                                + savedRequest.getEndDate()
                                + " has been submitted successfully."
                );

        notificationServiceClient.createNotification(
                notificationRequest
        );


        return mapToResponse(savedRequest);
    }


    // =========================================================
    // GET LEAVE REQUEST BY ID
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public LeaveRequestResponse getLeaveRequestById(
            Long id) {

        LeaveRequest leaveRequest =
                leaveRequestRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Leave request not found with id: "
                                                + id
                                )
                        );

        return mapToResponse(leaveRequest);
    }


    // =========================================================
    // GET EMPLOYEE LEAVE HISTORY
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<LeaveRequestResponse> getEmployeeLeaveHistory(
            Long employeeId) {

        return leaveRequestRepository
                .findByEmployeeIdOrderByAppliedAtDesc(employeeId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET MANAGER PENDING REQUESTS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<LeaveRequestResponse> getManagerPendingRequests(
            Long managerId) {

        return leaveRequestRepository
                .findByManagerIdAndStatus(
                        managerId,
                        LeaveRequest.Status.PENDING
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // PROCESS LEAVE REQUEST
    // =========================================================

    @Override
    public LeaveRequestResponse processLeaveRequest(
            Long requestId,
            Long managerId,
            LeaveApprovalRequest request) {

        LeaveRequest leaveRequest =
                leaveRequestRepository
                        .findById(requestId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Leave request not found with id: "
                                                + requestId
                                )
                        );


        // =====================================================
        // CHECK CURRENT STATUS
        // =====================================================

        if (!leaveRequest.getStatus()
                .equals(LeaveRequest.Status.PENDING)) {

            throw new IllegalArgumentException(
                    "Leave request has already been processed"
            );
        }


        // =====================================================
        // CHECK MANAGER ASSIGNMENT
        // =====================================================

        if (leaveRequest.getManagerId() == null) {

            throw new IllegalArgumentException(
                    "Manager is not assigned to this leave request"
            );
        }


        // =====================================================
        // CHECK MANAGER AUTHORIZATION
        // =====================================================

        if (!leaveRequest.getManagerId()
                .equals(managerId)) {

            throw new IllegalArgumentException(
                    "You are not authorized to process this leave request"
            );
        }


        // =====================================================
        // VALIDATE APPROVAL STATUS
        // =====================================================

        if (request.status() != LeaveRequest.Status.APPROVED
                && request.status() != LeaveRequest.Status.REJECTED) {

            throw new IllegalArgumentException(
                    "Invalid approval status"
            );
        }


        // =====================================================
        // UPDATE BALANCE WHEN APPROVED
        // =====================================================

        if (request.status()
                == LeaveRequest.Status.APPROVED) {

            updateLeaveBalance(leaveRequest);
        }


        // =====================================================
        // UPDATE LEAVE REQUEST
        // =====================================================

        leaveRequest.setStatus(
                request.status()
        );

        leaveRequest.setManagerComment(
                request.managerComment()
        );

        leaveRequest.setProcessedAt(
                LocalDateTime.now()
        );

        LeaveRequest updatedRequest =
                leaveRequestRepository.save(
                        leaveRequest
                );


        // =====================================================
        // SEND APPROVAL / REJECTION NOTIFICATION
        // =====================================================

        String notificationType;

        String notificationTitle;

        String notificationMessage;


        if (request.status()
                == LeaveRequest.Status.APPROVED) {

            notificationType =
                    "LEAVE_APPROVED";

            notificationTitle =
                    "Leave Request Approved";

            notificationMessage =
                    "Your leave request from "
                            + updatedRequest.getStartDate()
                            + " to "
                            + updatedRequest.getEndDate()
                            + " has been approved.";

        } else {

            notificationType =
                    "LEAVE_REJECTED";

            notificationTitle =
                    "Leave Request Rejected";

            notificationMessage =
                    "Your leave request from "
                            + updatedRequest.getStartDate()
                            + " to "
                            + updatedRequest.getEndDate()
                            + " has been rejected.";

        }


        NotificationServiceClient.NotificationRequest
                notificationRequest =
                new NotificationServiceClient.NotificationRequest(
                        updatedRequest.getEmployeeId(),
                        notificationType,
                        notificationTitle,
                        notificationMessage
                );

        notificationServiceClient.createNotification(
                notificationRequest
        );


        return mapToResponse(updatedRequest);
    }


    // =========================================================
    // UPDATE LEAVE BALANCE
    // =========================================================

    private void updateLeaveBalance(
            LeaveRequest leaveRequest) {

        int year =
                leaveRequest.getStartDate()
                        .getYear();

        LeaveBalance leaveBalance =
                leaveBalanceRepository
                        .findByEmployeeIdAndLeaveTypeIdAndYear(
                                leaveRequest.getEmployeeId(),
                                leaveRequest.getLeaveType().getId(),
                                year
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Leave balance not found"
                                )
                        );

        int remainingDays =
                leaveBalance.getAllocatedDays()
                        - leaveBalance.getUsedDays();

        if (leaveRequest.getNumberOfDays()
                > remainingDays) {

            throw new IllegalArgumentException(
                    "Insufficient leave balance"
            );
        }

        leaveBalance.setUsedDays(
                leaveBalance.getUsedDays()
                        + leaveRequest.getNumberOfDays()
        );

        leaveBalanceRepository.save(
                leaveBalance
        );
    }


    // =========================================================
    // VALIDATE DATES
    // =========================================================

    private void validateDates(
            LocalDate startDate,
            LocalDate endDate) {

        if (endDate.isBefore(startDate)) {

            throw new IllegalArgumentException(
                    "End date cannot be before start date"
            );
        }
    }


    // =========================================================
    // CALCULATE NUMBER OF DAYS
    // =========================================================

    private int calculateNumberOfDays(
            LocalDate startDate,
            LocalDate endDate) {

        return (int) ChronoUnit.DAYS.between(
                startDate,
                endDate
        ) + 1;
    }


    // =========================================================
    // MAP ENTITY TO RESPONSE DTO
    // =========================================================

    private LeaveRequestResponse mapToResponse(
            LeaveRequest leaveRequest) {

        String leaveTypeName =
                leaveRequest.getLeaveType() != null
                        ? leaveRequest.getLeaveType().getName()
                        : null;

        Long leaveTypeId =
                leaveRequest.getLeaveType() != null
                        ? leaveRequest.getLeaveType().getId()
                        : null;


        return new LeaveRequestResponse(
                leaveRequest.getId(),
                leaveRequest.getEmployeeId(),
                leaveTypeId,
                leaveTypeName,
                leaveRequest.getStartDate(),
                leaveRequest.getEndDate(),
                leaveRequest.getNumberOfDays(),
                leaveRequest.getReason(),
                leaveRequest.getStatus(),
                leaveRequest.getManagerId(),
                leaveRequest.getManagerComment(),
                leaveRequest.getAppliedAt(),
                leaveRequest.getProcessedAt()
        );
    }
}