import React from "react";
import EmptyState from "../common/EmptyState";
import LoadingSpinner from "../common/LoadingSpinner";

const LeaveBalanceTable = ({
    balances = [],
    loading = false,
}) => {
    if (loading) {
        return (
            <div className="table-loading-container">
                <LoadingSpinner />
            </div>
        );
    }

    if (!balances.length) {
        return (
            <EmptyState
                title="No Leave Balances"
                message="No leave balance records are available for the selected year."
            />
        );
    }

    return (
        <div className="table-responsive">
            <table className="data-table leave-balance-table">
                <thead>
                    <tr>
                        <th>Leave Type</th>
                        <th>Year</th>
                        <th>Allocated</th>
                        <th>Used</th>
                        <th>Remaining</th>
                    </tr>
                </thead>

                <tbody>
                    {balances.map((balance) => (
                        <tr key={balance.id}>
                            <td>
                                <div className="table-primary-text">
                                    {balance.leaveTypeName ||
                                        "-"}
                                </div>
                            </td>

                            <td>
                                {balance.year || "-"}
                            </td>

                            <td>
                                {balance.allocatedDays ?? 0}
                            </td>

                            <td>
                                {balance.usedDays ?? 0}
                            </td>

                            <td>
                                <span
                                    className={
                                        Number(
                                            balance.remainingDays
                                        ) > 0
                                            ? "balance-positive"
                                            : "balance-zero"
                                    }
                                >
                                    {balance.remainingDays ?? 0}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveBalanceTable;