import { useCallback, useEffect, useState } from "react";

import NotificationList from "../../components/notification/NotificationList";
import PageLoader from "../../components/common/PageLoader";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";

import notificationService from "../../services/notificationService";
import { useAuth } from "../../hooks/useAuth";

const Notifications = () => {
    const { user } = useAuth();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const employeeId = user?.id;

    const loadNotifications = useCallback(async () => {
        if (!employeeId) {
            setNotifications([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response =
                await notificationService.getNotificationsByEmployeeId(
                    employeeId
                );

            setNotifications(response?.data ?? response ?? []);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Unable to load notifications."
            );
        } finally {
            setLoading(false);
        }
    }, [employeeId]);

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    const handleMarkAsRead = async (notificationId) => {
        try {
            await notificationService.markAsRead(notificationId);

            setNotifications((currentNotifications) =>
                currentNotifications.map((notification) =>
                    notification.id === notificationId
                        ? {
                              ...notification,
                              read: true,
                          }
                        : notification
                )
            );
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Unable to mark notification as read."
            );
        }
    };

    const handleDelete = async (notificationId) => {
        try {
            await notificationService.deleteNotification(
                notificationId
            );

            setNotifications((currentNotifications) =>
                currentNotifications.filter(
                    (notification) =>
                        notification.id !== notificationId
                )
            );
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Unable to delete notification."
            );
        }
    };

    if (loading) {
        return <PageLoader />;
    }

    if (error && notifications.length === 0) {
        return (
            <ErrorState
                title="Unable to load notifications"
                message={error}
                onRetry={loadNotifications}
            />
        );
    }

    return (
        <div className="page-container">

            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Notifications
                    </h1>

                    <p className="page-subtitle">
                        View your latest leave management
                        notifications and updates.
                    </p>
                </div>
            </div>

            {error && notifications.length > 0 && (
                <div
                    className="form-error-message"
                    role="alert"
                >
                    {error}
                </div>
            )}

            {notifications.length === 0 ? (
                <EmptyState
                    title="No notifications"
                    message="You don't have any notifications at the moment."
                />
            ) : (
                <div className="content-card">

                    <NotificationList
                        notifications={notifications}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                    />

                </div>
            )}

        </div>
    );
};

export default Notifications;

