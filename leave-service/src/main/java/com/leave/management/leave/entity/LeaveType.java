package com.leave.management.leave.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "leave_types",
uniqueConstraints = {
                    @UniqueConstraint(
                        name = "uk_leave_type_name",
                        columnNames = "name"
                        )
                    } 
                )

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveType 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,
            length = 50)
    private String name;

    @Column(length = 255)
    private String description;

    @Column(name = "annual_allocation",
            nullable = false)
    private Integer annualAllocation;

    @Column(nullable = false)
    private Boolean active;
}
