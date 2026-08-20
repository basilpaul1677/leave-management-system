package com.leave.management.leave.serviceimpl;

import com.leave.management.leave.dto.LeaveTypeRequest;
import com.leave.management.leave.dto.LeaveTypeResponse;
import com.leave.management.leave.entity.LeaveType;
import com.leave.management.leave.repository.LeaveTypeRepository;
import com.leave.management.leave.service.LeaveTypeService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaveTypeServiceImpl implements LeaveTypeService 
{
    private final LeaveTypeRepository leaveTypeRepository;

    @Override
    public LeaveTypeResponse createLeaveType(LeaveTypeRequest request) 
    {
        if (leaveTypeRepository.existsByName(request.name())) 
        {
            throw new IllegalArgumentException("Leave type already exists: " + request.name());
        }

        LeaveType leaveType = LeaveType.builder()
                .name(request.name())
                .description(request.description())
                .annualAllocation(request.annualAllocation())
                .active(true)
                .build();

        LeaveType savedLeaveType = leaveTypeRepository.save(leaveType);

        return mapToResponse(savedLeaveType);
    }

    @Override
    public LeaveTypeResponse getLeaveTypeById(Long id) 
    {
        LeaveType leaveType = leaveTypeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Leave type not found with id: " + id));
        return mapToResponse(leaveType);
    }

    @Override
    public List<LeaveTypeResponse> getAllLeaveTypes() 
    {
        return leaveTypeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public LeaveTypeResponse updateLeaveType(Long id,LeaveTypeRequest request) 
    {
        LeaveType leaveType = leaveTypeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Leave type not found with id: " + id));

        if (leaveTypeRepository.existsByNameAndIdNot(request.name(),id)) 
        {
            throw new IllegalArgumentException("Leave type already exists: " + request.name());
        }

        leaveType.setName(request.name());
        leaveType.setDescription(request.description());
        leaveType.setAnnualAllocation(request.annualAllocation());

        LeaveType updatedLeaveType = leaveTypeRepository.save(leaveType);
        return mapToResponse(updatedLeaveType);
    }

    @Override
    public void deactivateLeaveType(Long id) 
    {
        LeaveType leaveType = leaveTypeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Leave type not found with id: " + id));

        leaveType.setActive(false);
        leaveTypeRepository.save(leaveType);
    }

    private LeaveTypeResponse mapToResponse(LeaveType leaveType) 
    {
        return new LeaveTypeResponse(
                leaveType.getId(),
                leaveType.getName(),
                leaveType.getDescription(),
                leaveType.getAnnualAllocation(),
                leaveType.getActive()
        );
    }
}