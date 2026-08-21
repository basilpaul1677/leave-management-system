import axiosInstance from "./api/axiosInstance";
import API_CONFIG from "./api/apiConfig";

const notificationService = {
    createNotification: async (notificationData) => {
        const response = await axiosInstance.post(
            API_CONFIG.endpoints.notifications.base,
            notificationData
        );

        return response.data;
    },

    getNotificationById: async (id) => {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.notifications.byId(id)
        );

        return response.data;
    },

    getNotificationsByEmployeeId: async (employeeId) => {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.notifications.byEmployee(
                employeeId
            )
        );

        return response.data;
    },

    getUnreadNotificationsByEmployeeId: async (employeeId) => {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.notifications.unread(
                employeeId
            )
        );

        return response.data;
    },

    markAsRead: async (id) => {
        const response = await axiosInstance.patch(
            API_CONFIG.endpoints.notifications.markAsRead(id)
        );

        return response.data;
    },

    deleteNotification: async (id) => {
        const response = await axiosInstance.delete(
            API_CONFIG.endpoints.notifications.byId(id)
        );

        return response.data;
    },
};

export default notificationService;