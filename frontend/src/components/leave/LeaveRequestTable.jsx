import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";
import StatusBadge from "../common/StatusBadge";

const LeaveRequestTable = ({
    leaveRequests = [],
    loading = false,
    onView,
    showEmployee = false,
    showActions = true
}) => {

    if (loading) {
        return (
            <div className="table-responsive">
                <table className="table app-table align-middle">
                    <thead>
                        <tr>
                            <th>Leave Type</th>
                            {showEmployee && <th>Employee</th>}
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Days</th>
                            <th>Status</th>
                            {showActions && <th className="text-end">Actions</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {[1, 2, 3, 4].map((item) => (
                            <tr key={item}>
                                <td colSpan={showEmployee ? 7 : 6}>
                                    <div className="placeholder-glow">
                                        <span className="placeholder col-12"></span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (!leaveRequests.length) {
        return (
            <div className="empty-state text-center py-5">
                <div className="empty-state-icon mb-3">
                    <i className="bi bi-calendar-x"></i>
                </div>

                <h5 className="mb-2">No leave requests found</h5>

                <p className="text-muted mb-0">
                    There are currently no leave requests to display.
                </p>
            </div>
        );
    }

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

    return (
        <div className="table-responsive">
            <table className="table app-table align-middle mb-0">

                <thead>
                    <tr>
                        <th>Leave Type</th>

                        {showEmployee && (
                            <th>Employee</th>
                        )}

                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Days</th>
                        <th>Status</th>

                        {showActions && (
                            <th className="text-end">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {leaveRequests.map((leave) => (

                        <tr key={leave.id}>

                            {/* Leave Type */}
                            <td>
                                <div className="fw-semibold">
                                    {leave.leaveTypeName ||
                                        leave.leaveType?.name ||
                                        "Leave"}
                                </div>

                                {leave.reason && (
                                    <small className="text-muted text-truncate d-block leave-reason">
                                        {leave.reason}
                                    </small>
                                )}
                            </td>

                            {/* Employee */}
                            {showEmployee && (
                                <td>
                                    <div className="fw-medium">
                                        {leave.employeeName ||
                                            `Employee #${leave.employeeId}`}
                                    </div>

                                    {leave.employeeId && (
                                        <small className="text-muted">
                                            ID: {leave.employeeId}
                                        </small>
                                    )}
                                </td>
                            )}

                            {/* Start Date */}
                            <td>
                                {formatDate(leave.startDate)}
                            </td>

                            {/* End Date */}
                            <td>
                                {formatDate(leave.endDate)}
                            </td>

                            {/* Days */}
                            <td>
                                <span className="fw-semibold">
                                    {leave.numberOfDays ??
                                        leave.days ??
                                        calculateDays(
                                            leave.startDate,
                                            leave.endDate
                                        )}
                                </span>
                            </td>

                            {/* Status */}
                            <td>
                                <StatusBadge
                                    status={leave.status}
                                />
                            </td>

                            {/* Actions */}
                            {showActions && (
                                <td className="text-end">
                                    <div className="d-inline-flex gap-2">

                                        {onView ? (
                                            <Button
                                                type="button"
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() =>
                                                    onView(leave)
                                                }
                                            >
                                                <i className="bi bi-eye me-1"></i>
                                                View
                                            </Button>
                                        ) : (
                                            <Link
                                                to={`/leaves/${leave.id}`}
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                <i className="bi bi-eye me-1"></i>
                                                View
                                            </Link>
                                        )}

                                    </div>
                                </td>
                            )}

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default LeaveRequestTable;