import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";
import { Button } from "../common/Button";

const LeaveRequestCard = ({
    leaveRequest,
    onView,
    showEmployee = false,
    showActions = true
}) => {

    if (!leaveRequest) {
        return null;
    }

    const formatDate = (date) => {
        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const calculateDays = (startDate, endDate) => {
        if (!startDate || !endDate) {
            return "-";
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const difference =
            Math.ceil(
                (end - start) / (1000 * 60 * 60 * 24)
            ) + 1;

        return difference > 0 ? difference : "-";
    };

    const leaveType =
        leaveRequest.leaveTypeName ||
        leaveRequest.leaveType?.name ||
        "Leave";

    const employeeName =
        leaveRequest.employeeName ||
        `Employee #${leaveRequest.employeeId}`;

    const numberOfDays =
        leaveRequest.numberOfDays ??
        leaveRequest.days ??
        calculateDays(
            leaveRequest.startDate,
            leaveRequest.endDate
        );

    return (
        <article className="card app-card leave-request-card h-100">

            <div className="card-body">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">

                    <div className="min-width-0">

                        <div className="d-flex align-items-center gap-2 mb-1">

                            <div className="leave-request-icon">
                                <i className="bi bi-calendar-event"></i>
                            </div>

                            <h5 className="card-title mb-0 text-truncate">
                                {leaveType}
                            </h5>

                        </div>

                        <small className="text-muted">
                            Request #{leaveRequest.id}
                        </small>

                    </div>

                    <div className="flex-shrink-0">
                        <StatusBadge
                            status={leaveRequest.status}
                        />
                    </div>

                </div>

                {/* Employee */}
                {showEmployee && (
                    <div className="leave-card-info mb-3">

                        <div className="d-flex align-items-center gap-2">

                            <div className="leave-info-icon">
                                <i className="bi bi-person"></i>
                            </div>

                            <div>
                                <small className="text-muted d-block">
                                    Employee
                                </small>

                                <span className="fw-semibold">
                                    {employeeName}
                                </span>
                            </div>

                        </div>

                    </div>
                )}

                {/* Leave Dates */}
                <div className="leave-card-dates mb-3">

                    <div className="leave-date-item">

                        <small className="text-muted d-block">
                            Start Date
                        </small>

                        <span className="fw-semibold">
                            {formatDate(
                                leaveRequest.startDate
                            )}
                        </span>

                    </div>

                    <div className="leave-date-divider">
                        <i className="bi bi-arrow-right"></i>
                    </div>

                    <div className="leave-date-item">

                        <small className="text-muted d-block">
                            End Date
                        </small>

                        <span className="fw-semibold">
                            {formatDate(
                                leaveRequest.endDate
                            )}
                        </span>

                    </div>

                </div>

                {/* Number of Days */}
                <div className="leave-card-summary mb-3">

                    <div className="d-flex align-items-center gap-2">

                        <i className="bi bi-clock-history"></i>

                        <span className="text-muted">
                            Duration
                        </span>

                    </div>

                    <span className="fw-bold">
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

                {/* Reason */}
                {leaveRequest.reason && (
                    <div className="leave-card-reason mb-3">

                        <small className="text-muted d-block mb-1">
                            Reason
                        </small>

                        <p className="mb-0">
                            {leaveRequest.reason}
                        </p>

                    </div>
                )}

                {/* Actions */}
                {showActions && (
                    <div className="d-flex justify-content-end gap-2 pt-3 border-top">

                        {onView ? (
                            <Button
                                type="button"
                                variant="outline-primary"
                                size="sm"
                                onClick={() =>
                                    onView(leaveRequest)
                                }
                            >
                                <i className="bi bi-eye me-1"></i>
                                View Details
                            </Button>
                        ) : (
                            <Link
                                to={`/leaves/${leaveRequest.id}`}
                                className="btn btn-sm btn-outline-primary"
                            >
                                <i className="bi bi-eye me-1"></i>
                                View Details
                            </Link>
                        )}

                    </div>
                )}

            </div>

        </article>
    );
};

export default LeaveRequestCard;