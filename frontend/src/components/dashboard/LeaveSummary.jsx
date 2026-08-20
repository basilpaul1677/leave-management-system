import React from "react";

const LeaveSummary = ({
    balances = []
}) => {
    if (!balances.length) {
        return (
            <div className="dashboard-panel leave-summary-panel">
                <div className="panel-header">
                    <div>
                        <h2>Leave Summary</h2>
                        <p>Your current leave balances</p>
                    </div>
                </div>

                <div className="dashboard-empty-state">
                    <div className="dashboard-empty-icon">
                        📋
                    </div>

                    <h3>No leave balance available</h3>

                    <p>
                        Leave balance information will appear
                        here once it is available.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-panel leave-summary-panel">
            <div className="panel-header">
                <div>
                    <h2>Leave Summary</h2>
                    <p>Your current leave balances</p>
                </div>
            </div>

            <div className="leave-summary-list">
                {balances.map((balance) => (
                    <div
                        className="leave-summary-item"
                        key={balance.id}
                    >
                        <div className="leave-summary-info">
                            <h3>
                                {balance.leaveTypeName}
                            </h3>

                            <span>
                                {balance.usedDays} used
                            </span>
                        </div>

                        <div className="leave-summary-progress-wrapper">
                            <div className="leave-summary-progress">
                                <div
                                    className="leave-summary-progress-bar"
                                    style={{
                                        width: `${Math.min(
                                            100,
                                            balance.allocatedDays > 0
                                                ? (balance.usedDays /
                                                    balance.allocatedDays) *
                                                  100
                                                : 0
                                        )}%`
                                    }}
                                />
                            </div>

                            <span className="leave-summary-remaining">
                                {balance.remainingDays} remaining
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaveSummary;