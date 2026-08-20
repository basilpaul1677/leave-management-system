import React from "react";
import {
    Bell,
    Check,
    Trash2,
    CalendarDays,
    Info,
    AlertCircle,
    CheckCircle,
    XCircle,
} from "lucide-react";

const NotificationCard = ({
    notification,
    onMarkAsRead,
    onDelete,
}) => {
    const getNotificationIcon = () => {
        const type = notification.type?.toUpperCase();

        switch (type) {
            case "LEAVE_APPROVED":
            case "APPROVED":
                return <CheckCircle size={22} />;

            case "LEAVE_REJECTED":
            case "REJECTED":
                return <XCircle size={22} />;

            case "LEAVE_APPLIED":
            case "LEAVE_REQUEST":
                return <CalendarDays size={22} />;

            case "WARNING":
                return <AlertCircle size={22} />;

            case "INFO":
                return <Info size={22} />;

            default:
                return <Bell size={22} />;
        }
    };

    const getNotificationTypeClass = () => {
        const type = notification.type?.toUpperCase();

        switch (type) {
            case "LEAVE_APPROVED":
            case "APPROVED":
                return "notification-icon-success";

            case "LEAVE_REJECTED":
            case "REJECTED":
                return "notification-icon-danger";

            case "WARNING":
                return "notification-icon-warning";

            case "INFO":
                return "notification-icon-info";

            default:
                return "notification-icon-default";
        }
    };

    const formatDate = (date) => {
        if (!date) {
            return "";
        }

        const notificationDate = new Date(date);

        return notificationDate.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div
            className={`notification-card ${
                notification.read
                    ? "notification-card-read"
                    : "notification-card-unread"
            }`}
        >
            <div
                className={`notification-card-icon ${getNotificationTypeClass()}`}
            >
                {getNotificationIcon()}
            </div>

            <div className="notification-card-content">
                <div className="notification-card-header">
                    <div>
                        <h6 className="notification-card-title">
                            {notification.title}
                        </h6>

                        {notification.type && (
                            <span className="notification-card-type">
                                {notification.type.replaceAll("_", " ")}
                            </span>
                        )}
                    </div>

                    {!notification.read && (
                        <span className="notification-unread-dot"></span>
                    )}
                </div>

                <p className="notification-card-message">
                    {notification.message}
                </p>

                <div className="notification-card-footer">
                    <span className="notification-card-date">
                        {formatDate(notification.createdAt)}
                    </span>

                    <div className="notification-card-actions">
                        {!notification.read && (
                            <button
                                type="button"
                                className="notification-action-button"
                                onClick={() =>
                                    onMarkAsRead?.(notification.id)
                                }
                                title="Mark as read"
                            >
                                <Check size={17} />
                                <span>Mark as read</span>
                            </button>
                        )}

                        <button
                            type="button"
                            className="notification-action-button notification-delete-action"
                            onClick={() =>
                                onDelete?.(notification.id)
                            }
                            title="Delete notification"
                        >
                            <Trash2 size={17} />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationCard;