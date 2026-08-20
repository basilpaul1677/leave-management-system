import React from "react";

const RecentActivity = ({ activities = [] }) => {
    return (
        <div className="dashboard-panel recent-activity-panel">
            <div className="panel-header">
                <div>
                    <h2>Recent Activity</h2>
                    <p>Your latest leave activity</p>
                </div>
            </div>

            {!activities.length ? (
                <div className="dashboard-empty-state compact">
                    <div className="dashboard-empty-icon">
                        📝
                    </div>

                    <h3>No recent activity</h3>

                    <p>
                        Your recent leave activity will appear
                        here.
                    </p>
                </div>
            ) : (
                <div className="recent-activity-list">
                    {activities.map((activity) => (
                        <div
                            className="recent-activity-item"
                            key={activity.id}
                        >
                            <div className="activity-dot"></div>

                            <div className="activity-content">
                                <h3>
                                    {activity.title}
                                </h3>

                                <p>
                                    {activity.description}
                                </p>

                                <span>
                                    {activity.date}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentActivity;