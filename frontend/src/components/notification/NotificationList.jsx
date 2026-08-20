import React from "react";
import NotificationCard from "./NotificationCard";
import { Bell } from "lucide-react";

const NotificationList = ({
    notifications = [],
    loading = false,
    onMarkAsRead,
    onDelete,
}) => {
    if (loading) {
        return (
            <div className="notification-list-loading">
                <div
                    className="spinner-border"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p>Loading notifications...</p>
            </div>
        );
    }

    if (notifications.length === 0) {
        return (
            <div className="notification-list-empty">
                <div className="notification-empty-icon">
                    <Bell size={34} />
                </div>

                <h5>No notifications found</h5>

                <p>
                    You currently don't have any notifications.
                </p>
            </div>
        );
    }

    return (
        <div className="notification-list">
            {notifications.map((notification) => (
                <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={onMarkAsRead}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default NotificationList;