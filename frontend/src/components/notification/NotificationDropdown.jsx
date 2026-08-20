import React from "react";
import { Bell, CheckCheck, ChevronRight } from "lucide-react";
import NotificationItem from "./NotificationItem";
import { useNotifications } from "../../hooks/useNotifications";

const NotificationDropdown = ({ onViewAll }) => {
    const {
        notifications,
        unreadCount,
        markNotificationAsRead,
        loading,
    } = useNotifications();

    const recentNotifications = notifications.slice(0, 5);

    const handleMarkAsRead = async (notification) => {
        if (!notification.read) {
            await markNotificationAsRead(notification.id);
        }
    };

    return (
        <div className="notification-dropdown">
            {/* Header */}
            <div className="notification-dropdown-header">
                <div>
                    <h6 className="notification-dropdown-title">
                        Notifications
                    </h6>

                    <span className="notification-dropdown-subtitle">
                        {unreadCount > 0
                            ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                            : "You're all caught up"}
                    </span>
                </div>

                <Bell size={19} />
            </div>

            {/* Content */}
            <div className="notification-dropdown-body">
                {loading ? (
                    <div className="notification-dropdown-loading">
                        <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>

                        <span>Loading notifications...</span>
                    </div>
                ) : recentNotifications.length === 0 ? (
                    <div className="notification-dropdown-empty">
                        <div className="notification-empty-icon">
                            <Bell size={28} />
                        </div>

                        <h6>No notifications</h6>

                        <p>
                            You don't have any notifications right now.
                        </p>
                    </div>
                ) : (
                    recentNotifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={handleMarkAsRead}
                        />
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="notification-dropdown-footer">
                <button
                    type="button"
                    className="notification-footer-action"
                    onClick={onViewAll}
                >
                    View all notifications
                    <ChevronRight size={17} />
                </button>

                {unreadCount > 0 && (
                    <button
                        type="button"
                        className="notification-mark-all"
                        onClick={() => {
                            notifications
                                .filter((notification) => !notification.read)
                                .forEach(handleMarkAsRead);
                        }}
                    >
                        <CheckCheck size={16} />
                        Mark as read
                    </button>
                )}
            </div>
        </div>
    ); 
};

export default NotificationDropdown;