import React from "react";

const LeaveBalanceCard = ({ balance }) => {
    if (!balance) {
        return null;
    }

    const allocated = Number(balance.allocatedDays ?? 0);
    const used = Number(balance.usedDays ?? 0);
    const remaining = Number(
        balance.remainingDays ?? allocated - used
    );

    const percentage =
        allocated > 0
            ? Math.min((used / allocated) * 100, 100)
            : 0;

    return (
        <div className="leave-balance-card">
            <div className="leave-balance-card-header">
                <div>
                    <h3>
                        {balance.leaveTypeName ||
                            "Leave"}
                    </h3>

                    <span className="leave-balance-year">
                        {balance.year}
                    </span>
                </div>

                <div className="leave-balance-remaining">
                    <strong>{remaining}</strong>
                    <span>remaining</span>
                </div>
            </div>

            <div className="leave-balance-progress">
                <div
                    className="leave-balance-progress-bar"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>

            <div className="leave-balance-stats">
                <div className="leave-balance-stat">
                    <span>Allocated</span>
                    <strong>{allocated}</strong>
                </div>

                <div className="leave-balance-stat">
                    <span>Used</span>
                    <strong>{used}</strong>
                </div>

                <div className="leave-balance-stat">
                    <span>Remaining</span>
                    <strong>{remaining}</strong>
                </div>
            </div>
        </div>
    );
};

export default LeaveBalanceCard;