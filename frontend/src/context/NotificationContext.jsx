import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import notificationService from "../services/notificationService";
import { useAuth } from "../hooks/useAuth";

export const NotificationContext =
    createContext(null);

const NotificationContextProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();

    const [notifications, setNotifications] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const employeeId = user?.id;

    const loadNotifications = useCallback(
        async () => {
            if (!employeeId || !isAuthenticated) {
                setNotifications([]);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response =
                    await notificationService
                        .getNotificationsByEmployeeId(
                            employeeId
                        );

                setNotifications(
                    response?.data ??
                    response ??
                    []
                );
            } catch (err) {
                setError(
                    err?.response?.data?.message ||
                    "Unable to load notifications."
                );
            } finally {
                setLoading(false);
            }
        },
        [
            employeeId,
            isAuthenticated,
        ]
    );

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    const unreadCount = notifications.filter(
        (notification) =>
            !notification.read
    ).length;

    const markAsRead = useCallback(
        async (notificationId) => {
            await notificationService.markAsRead(
                notificationId
            );

            setNotifications(
                (currentNotifications) =>
                    currentNotifications.map(
                        (notification) =>
                            notification.id ===
                            notificationId
                                ? {
                                      ...notification,
                                      read: true,
                                  }
                                : notification
                    )
            );
        },
        []
    );

    const deleteNotification = useCallback(
        async (notificationId) => {
            await notificationService.deleteNotification(
                notificationId
            );

            setNotifications(
                (currentNotifications) =>
                    currentNotifications.filter(
                        (notification) =>
                            notification.id !==
                            notificationId
                    )
            );
        },
        []
    );

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    const value = useMemo(
        () => ({
            notifications,
            unreadCount,
            loading,
            error,
            loadNotifications,
            markAsRead,
            deleteNotification,
            clearNotifications,
        }),
        [
            notifications,
            unreadCount,
            loading,
            error,
            loadNotifications,
            markAsRead,
            deleteNotification,
            clearNotifications,
        ]
    );

    return (
        <NotificationContext.Provider
            value={value}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;