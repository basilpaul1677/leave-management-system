import React from "react";
import {
    Bell,
    CheckCircle,
    XCircle,
    CalendarDays,
    AlertCircle,
    Info,
} from "lucide-react";

const NotificationItem = ({
    notification,
    onMarkAsRead,
}) => {
    const getIcon = () => {
        const type = notification.type?.toUpperCase();

        switch (type) {
            case "LEAVE_APPROVED":
            case "APPROVED":
                return <CheckCircle size={18} />;

            case "LEAVE_REJECTED":
            case "REJECTED":
                return <XCircle size={18} />;

            case "LEAVE_APPLIED":
            case "LEAVE_REQUEST":
                return <CalendarDays size={18} />;

            case "WARNING":
                return <AlertCircle size={18} />;

            case "INFO":
                return <Info size={18} />;

            default:
                return <Bell size={18} />;
        }
    };

    const formatTime = (date) => {
        if (!date) {
            return "";
        }

        const notificationDate = new Date(date);
        const now = new Date();

        const difference =
            now.getTime() - notificationDate.getTime();

        const minutes = Math.floor(
            difference / (1000 * 60)
        );

        if (minutes < 1) {
            return "Just now";
        }

        if (minutes < 60) {
            return `${minutes}m ago`;
        }

        const hours = Math.floor(minutes / 60);

        if (hours < 24) {
            return `${hours}h ago`;
        }

        const days = Math.floor(hours / 24);

        if (days < 7) {
            return `${days}d ago`;
        }

        return notificationDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
            }
        );
    };

    const handleClick = () => {
        if (!notification.read) {
            onMarkAsRead?.(notification);
        }
    };

    return (
        <button
            type="button"
            className={`notification-item ${
                notification.read
                    ? "notification-item-read"
                    : "notification-item-unread"
            }`}
            onClick={handleClick}
        >
            <div className="notification-item-icon">
                {getIcon()}
            </div>

            <div className="notification-item-content">
                <div className="notification-item-top">
                    <h6 className="notification-item-title">
                        {notification.title}
                    </h6>

                    <span className="notification-item-time">
                        {formatTime(notification.createdAt)}
                    </span>
                </div>

                <p className="notification-item-message">
                    {notification.message}
                </p>
            </div>

            {!notification.read && (
                <span className="notification-item-unread-dot"></span>
            )}
        </button>
    );
};

export default NotificationItem;