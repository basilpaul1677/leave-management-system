import React from "react";
import Button from "../common/Button";
import EmptyState from "../common/EmptyState";
import LoadingSpinner from "../common/LoadingSpinner";
import StatusBadge from "../common/StatusBadge";

const LeaveTypeTable = ({
    leaveTypes = [],
    loading = false,
    onEdit,
    onDeactivate,
}) => {
    if (loading) {
        return (
            <div className="table-loading-container">
                <LoadingSpinner />
            </div>
        );
    }

    if (!leaveTypes.length) {
        return (
            <EmptyState
                title="No Leave Types"
                message="No leave types are currently available."
            />
        );
    }

    return (
        <div className="table-responsive">
            <table className="data-table leave-type-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Default Days</th>
                        <th>Status</th>
                        <th className="table-actions-column">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {leaveTypes.map((leaveType) => {
                        const active =
                            leaveType.active !== false;

                        return (
                            <tr key={leaveType.id}>
                                <td>
                                    <div className="table-primary-text">
                                        {leaveType.name}
                                    </div>
                                </td>

                                <td>
                                    <span className="table-secondary-text">
                                        {leaveType.description ||
                                            "No description"}
                                    </span>
                                </td>

                                <td>
                                    {leaveType.defaultDays ??
                                        leaveType.allocatedDays ??
                                        "-"}
                                </td>

                                <td>
                                    <StatusBadge
                                        status={
                                            active
                                                ? "ACTIVE"
                                                : "INACTIVE"
                                        }
                                    />
                                </td>

                                <td>
                                    <div className="table-actions">
                                        {onEdit && (
                                            <Button
                                                variant="secondary"
                                                size="small"
                                                onClick={() =>
                                                    onEdit(
                                                        leaveType
                                                    )
                                                }
                                                disabled={!active}
                                            >
                                                Edit
                                            </Button>
                                        )}

                                        {onDeactivate &&
                                            active && (
                                                <Button
                                                    variant="danger"
                                                    size="small"
                                                    onClick={() =>
                                                        onDeactivate(
                                                            leaveType
                                                        )
                                                    }
                                                >
                                                    Deactivate
                                                </Button>
                                            )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveTypeTable;