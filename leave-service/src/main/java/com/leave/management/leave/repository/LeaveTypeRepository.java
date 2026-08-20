package com.leave.management.leave.repository;

import com.leave.management.leave.entity.LeaveType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LeaveTypeRepository extends JpaRepository<LeaveType, Long> 
{
    Optional<LeaveType> findByName(String name);

    boolean existsByName(String name);

    boolean existsByNameAndIdNot(String name, Long id);
}