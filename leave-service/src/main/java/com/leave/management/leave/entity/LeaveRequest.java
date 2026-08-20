package com.leave.management.leave.entity;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "leave_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "employee_id",
            nullable = false
    )
    private Long employeeId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "leave_type_id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "fk_leave_request_leave_type"
            )
    )
    private LeaveType leaveType;

    @Column(
            name = "start_date",
            nullable = false
    )
    private LocalDate startDate;

    @Column(
            name = "end_date",
            nullable = false
    )
    private LocalDate endDate;

    @Column(
            name = "number_of_days",
            nullable = false
    )
    private Integer numberOfDays;

    @Column(length = 500)
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false,
            length = 20
    )
    private Status status;

    @Column(name = "manager_id")
    private Long managerId;

    @Column(name = "manager_comment", length = 500)
    private String managerComment;

    @Column(
            name = "applied_at",
            nullable = false
    )
    private LocalDateTime appliedAt;

    @Column(name = "processed_at")
    private LocalDateTime processedAt;

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }
}