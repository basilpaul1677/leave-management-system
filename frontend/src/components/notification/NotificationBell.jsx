import React from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";

const NotificationBell = ({ onClick }) => {
    const { unreadCount } = useNotifications();

    return (
        <button
            type="button"
            className="notification-bell"
            onClick={onClick}
            aria-label="Notifications"
        >
            <Bell size={21} strokeWidth={2} />

            {unreadCount > 0 && (
                <span className="notification-badge">
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}
        </button>
    );
};

export default NotificationBell;