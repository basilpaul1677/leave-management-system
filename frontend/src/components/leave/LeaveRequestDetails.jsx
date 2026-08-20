import React from "react";
import StatusBadge from "../common/StatusBadge";
import RoleBadge from "../common/RoleBadge";
import Button from "../common/Button";

const LeaveRequestDetails = ({
    leaveRequest,
    loading = false,
    onBack,
    onApprove,
    onReject,
    canProcess = false
}) => {

    if (loading) {
        return (
            <div className="leave-request-details">
                <div className="card app-card">
                    <div className="card-body p-4">

                        <div className="placeholder-glow">
                            <span className="placeholder col-6 mb-3"></span>
                            <span className="placeholder col-4 mb-4"></span>

                            <div className="row g-4">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <div
                                        className="col-md-6"
                                        key={item}
                                    >
                                        <span className="placeholder col-8"></span>
                                        <br />
                                        <span className="placeholder col-6"></span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    if (!leaveRequest) {
        return (
            <div className="empty-state text-center py-5">
                <div className="empty-state-icon mb-3">
                    <i className="bi bi-file-earmark-x"></i>
                </div>

                <h5 className="mb-2">
                    Leave request not found
                </h5>

                <p className="text-muted mb-3">
                    The requested leave information could not be found.
                </p>

                {onBack && (
                    <Button
                        type="button"
                        variant="outline-primary"
                        onClick={onBack}
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Go Back
                    </Button>
                )}
            </div>
        );
    }

    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        return new Date(`${date}T00:00:00`).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) {
            return "-";
        }

        return new Date(dateTime).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };

    const calculateDays = (startDate, endDate) => {
        if (!startDate || !endDate) {
            return "-";
        }

        const start = new Date(`${startDate}T00:00:00`);
        const end = new Date(`${endDate}T00:00:00`);

        const difference =
            Math.ceil(
                (end - start) /
                    (1000 * 60 * 60 * 24)
            ) + 1;

        return difference > 0 ? difference : "-";
    };

    const numberOfDays =
        leaveRequest.numberOfDays ??
        leaveRequest.days ??
        calculateDays(
            leaveRequest.startDate,
            leaveRequest.endDate
        );

    const leaveType =
        leaveRequest.leaveTypeName ||
        leaveRequest.leaveType?.name ||
        "Leave";

    const employeeName =
        leaveRequest.employeeName ||
        (leaveRequest.employeeId
            ? `Employee #${leaveRequest.employeeId}`
            : "Employee");

    const managerName =
        leaveRequest.managerName ||
        (leaveRequest.managerId
            ? `Manager #${leaveRequest.managerId}`
            : null);

    const status =
        leaveRequest.status || "PENDING";

    const isPending =
        String(status).toUpperCase() === "PENDING";

    return (
        <div className="leave-request-details">

            {/* Page Header */}
            <div className="leave-details-header mb-4">

                <div className="d-flex align-items-start gap-3">

                    {onBack && (
                        <Button
                            type="button"
                            variant="outline-secondary"
                            size="sm"
                            onClick={onBack}
                        >
                            <i className="bi bi-arrow-left"></i>
                        </Button>
                    )}

                    <div className="flex-grow-1 min-width-0">

                        <div className="d-flex flex-wrap align-items-center gap-2 mb-1">

                            <h3 className="mb-0">
                                Leave Request
                            </h3>

                            <StatusBadge status={status} />

                        </div>

                        <p className="text-muted mb-0">
                            Request #{leaveRequest.id}
                        </p>

                    </div>

                </div>

            </div>

            <div className="row g-4">

                {/* Main Information */}
                <div className="col-lg-8">

                    <div className="card app-card h-100">

                        <div className="card-header bg-transparent border-bottom">

                            <div className="d-flex align-items-center gap-2">

                                <div className="leave-details-section-icon">
                                    <i className="bi bi-calendar-event"></i>
                                </div>

                                <div>
                                    <h5 className="mb-0">
                                        Leave Information
                                    </h5>

                                    <small className="text-muted">
                                        Details of the leave request
                                    </small>
                                </div>

                            </div>

                        </div>

                        <div className="card-body">

                            <div className="row g-4">

                                {/* Leave Type */}
                                <div className="col-md-6">

                                    <div className="detail-item">

                                        <span className="detail-label">
                                            Leave Type
                                        </span>

                                        <span className="detail-value">
                                            {leaveType}
                                        </span>

                                    </div>

                                </div>

                                {/* Duration */}
                                <div className="col-md-6">

                                    <div className="detail-item">

                                        <span className="detail-label">
                                            Duration
                                        </span>

                                        <span className="detail-value">
                                            {numberOfDays}
                                            {numberOfDays !== "-" && (
                                                <>
                                                    {" "}
                                                    {Number(numberOfDays) === 1
                                                        ? "day"
                                                        : "days"}
                                                </>
                                            )}
                                        </span>

                                    </div>

                                </div>

                                {/* Start Date */}
                                <div className="col-md-6">

                                    <div className="detail-item">

                                        <span className="detail-label">
                                            Start Date
                                        </span>

                                        <span className="detail-value">
                                            <i className="bi bi-calendar3 me-2 text-primary"></i>
                                            {formatDate(
                                                leaveRequest.startDate
                                            )}
                                        </span>

                                    </div>

                                </div>

                                {/* End Date */}
                                <div className="col-md-6">

                                    <div className="detail-item">

                                        <span className="detail-label">
                                            End Date
                                        </span>

                                        <span className="detail-value">
                                            <i className="bi bi-calendar3 me-2 text-primary"></i>
                                            {formatDate(
                                                leaveRequest.endDate
                                            )}
                                        </span>

                                    </div>

                                </div>

                                {/* Reason */}
                                <div className="col-12">

                                    <div className="detail-item">

                                        <span className="detail-label">
                                            Reason
                                        </span>

                                        <div className="detail-reason">
                                            {leaveRequest.reason ||
                                                "No reason provided."}
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Employee Information */}
                <div className="col-lg-4">

                    <div className="card app-card h-100">

                        <div className="card-header bg-transparent border-bottom">

                            <div className="d-flex align-items-center gap-2">

                                <div className="leave-details-section-icon">
                                    <i className="bi bi-person"></i>
                                </div>

                                <div>
                                    <h5 className="mb-0">
                                        Employee
                                    </h5>

                                    <small className="text-muted">
                                        Applicant information
                                    </small>
                                </div>

                            </div>

                        </div>

                        <div className="card-body">

                            <div className="employee-detail-profile">

                                <div className="employee-detail-avatar">
                                    <i className="bi bi-person"></i>
                                </div>

                                <div className="text-center">

                                    <h6 className="mb-1">
                                        {employeeName}
                                    </h6>

                                    {leaveRequest.employeeId && (
                                        <small className="text-muted">
                                            Employee ID:{" "}
                                            {leaveRequest.employeeId}
                                        </small>
                                    )}

                                </div>

                            </div>

                            {leaveRequest.department && (
                                <div className="detail-item mt-4">

                                    <span className="detail-label">
                                        Department
                                    </span>

                                    <span className="detail-value">
                                        {leaveRequest.department}
                                    </span>

                                </div>
                            )}

                        </div>

                    </div>

                </div>

                {/* Manager Information */}
                {managerName && (
                    <div className="col-md-6">

                        <div className="card app-card h-100">

                            <div className="card-body">

                                <div className="d-flex align-items-center gap-3">

                                    <div className="leave-details-section-icon">
                                        <i className="bi bi-person-badge"></i>
                                    </div>

                                    <div>

                                        <span className="detail-label">
                                            Assigned Manager
                                        </span>

                                        <span className="detail-value">
                                            {managerName}
                                        </span>

                                        {leaveRequest.managerId && (
                                            <small className="text-muted d-block">
                                                Manager ID:{" "}
                                                {leaveRequest.managerId}
                                            </small>
                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                )}

                {/* Request Metadata */}
                <div
                    className={
                        managerName
                            ? "col-md-6"
                            : "col-12"
                    }
                >

                    <div className="card app-card h-100">

                        <div className="card-body">

                            <div className="d-flex align-items-center gap-3">

                                <div className="leave-details-section-icon">
                                    <i className="bi bi-clock-history"></i>
                                </div>

                                <div>

                                    <span className="detail-label">
                                        Request Information
                                    </span>

                                    {leaveRequest.createdAt ? (
                                        <span className="detail-value">
                                            Submitted{" "}
                                            {formatDateTime(
                                                leaveRequest.createdAt
                                            )}
                                        </span>
                                    ) : (
                                        <span className="detail-value">
                                            Request #{leaveRequest.id}
                                        </span>
                                    )}

                                    {leaveRequest.updatedAt && (
                                        <small className="text-muted d-block">
                                            Last updated:{" "}
                                            {formatDateTime(
                                                leaveRequest.updatedAt
                                            )}
                                        </small>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Processing Actions */}
                {canProcess && isPending && (
                    <div className="col-12">

                        <div className="leave-processing-panel">

                            <div>
                                <h6 className="mb-1">
                                    Manager Action Required
                                </h6>

                                <p className="text-muted mb-0">
                                    Review the request and approve or
                                    reject it.
                                </p>
                            </div>

                            <div className="d-flex gap-2 flex-wrap">

                                {onReject && (
                                    <Button
                                        type="button"
                                        variant="outline-danger"
                                        onClick={() =>
                                            onReject(leaveRequest)
                                        }
                                    >
                                        <i className="bi bi-x-circle me-2"></i>
                                        Reject
                                    </Button>
                                )}

                                {onApprove && (
                                    <Button
                                        type="button"
                                        variant="success"
                                        onClick={() =>
                                            onApprove(leaveRequest)
                                        }
                                    >
                                        <i className="bi bi-check-circle me-2"></i>
                                        Approve
                                    </Button>
                                )}

                            </div>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};

export default LeaveRequestDetails;