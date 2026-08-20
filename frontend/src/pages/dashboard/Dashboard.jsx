import React from "react";

import DashboardWelcome from "../../components/dashboard/DashboardWelcome";
import StatCard from "../../components/dashboard/StatCard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";
import LeaveSummary from "../../components/dashboard/LeaveSummary";
import PendingLeaveCard from "../../components/dashboard/PendingLeaveCard";
import RecentActivity from "../../components/dashboard/RecentActivity";

import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();

    const role = user?.role;

    /*
     * Dashboard data will be connected to the backend
     * service APIs in the next integration step.
     *
     * For now, these values are intentionally kept at
     * zero instead of inventing backend data.
     */
    const statistics = {
        totalLeaves: 0,
        pendingLeaves: 0,
        approvedLeaves: 0,
        remainingLeaves: 0
    };

    const leaveBalances = [];

    const pendingLeaves = [];

    const recentActivities = [];

    return (
        <div className="dashboard-page">

            <DashboardWelcome />

            <section className="dashboard-stats-grid">

                <StatCard
                    title="Total Leave Requests"
                    value={statistics.totalLeaves}
                    subtitle="All submitted requests"
                    icon="📋"
                    variant="primary"
                />

                <StatCard
                    title="Pending Requests"
                    value={statistics.pendingLeaves}
                    subtitle="Awaiting approval"
                    icon="⏳"
                    variant="warning"
                />

                <StatCard
                    title="Approved Requests"
                    value={statistics.approvedLeaves}
                    subtitle="Successfully approved"
                    icon="✓"
                    variant="success"
                />

                <StatCard
                    title="Remaining Leave"
                    value={statistics.remainingLeaves}
                    subtitle="Available balance"
                    icon="🏖️"
                    variant="info"
                />

            </section>

            <section className="dashboard-main-grid">

                <LeaveSummary
                    balances={leaveBalances}
                />

                <div className="dashboard-panel quick-actions-panel">

                    <div className="panel-header">
                        <div>
                            <h2>Quick Actions</h2>
                            <p>Frequently used actions</p>
                        </div>
                    </div>

                    <div className="quick-actions-grid">

                        <QuickActionCard
                            title="Apply Leave"
                            description="Submit a new leave request"
                            icon="➕"
                            path="/leaves/apply"
                            variant="primary"
                        />

                        <QuickActionCard
                            title="My Leaves"
                            description="View your leave history"
                            icon="📄"
                            path="/leaves"
                            variant="secondary"
                        />

                        <QuickActionCard
                            title="Leave Balance"
                            description="Check your available balance"
                            icon="📊"
                            path="/leaves/balances"
                            variant="success"
                        />

                        {role === "MANAGER" ||
                        role === "ADMIN" ? (
                            <QuickActionCard
                                title="Pending Leaves"
                                description="Review pending requests"
                                icon="🕐"
                                path="/leaves/pending"
                                variant="warning"
                            />
                        ) : null}

                        {role === "ADMIN" ? (
                            <QuickActionCard
                                title="Employees"
                                description="Manage employees"
                                icon="👥"
                                path="/employees"
                                variant="info"
                            />
                        ) : null}

                        {role === "ADMIN" ? (
                            <QuickActionCard
                                title="Leave Types"
                                description="Manage leave types"
                                icon="⚙"
                                path="/leave-types"
                                variant="dark"
                            />
                        ) : null}

                    </div>
                </div>

            </section>

            <section className="dashboard-bottom-grid">

                <div className="dashboard-panel pending-leaves-panel">

                    <div className="panel-header">
                        <div>
                            <h2>Pending Leaves</h2>
                            <p>Requests requiring attention</p>
                        </div>
                    </div>

                    {pendingLeaves.length === 0 ? (
                        <div className="dashboard-empty-state compact">
                            <div className="dashboard-empty-icon">
                                ✓
                            </div>

                            <h3>No pending requests</h3>

                            <p>
                                There are currently no pending
                                leave requests.
                            </p>
                        </div>
                    ) : (
                        <div className="pending-leaves-list">
                            {pendingLeaves.map((leave) => (
                                <PendingLeaveCard
                                    key={leave.id}
                                    leave={leave}
                                />
                            ))}
                        </div>
                    )}

                </div>

                <RecentActivity
                    activities={recentActivities}
                />

            </section>

        </div>
    );
};

export default Dashboard;