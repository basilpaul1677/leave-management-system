import axiosInstance from "./api/axiosInstance";
import API_CONFIG from "./api/apiConfig";

const leaveRequestService = {
    createLeaveRequest: async (requestData) => {
        const response = await axiosInstance.post(
            API_CONFIG.endpoints.leaveRequests.base,
            requestData
        );

        return response.data;
    },

    applyLeave: async (employeeId, requestData) => {
        const payload = {
            ...requestData,
            employeeId,
        };

        return leaveRequestService.createLeaveRequest(payload);
    },

    getLeaveRequestById: async (id) => {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.leaveRequests.byId(id)
        );

        return response.data;
    },

    getEmployeeLeaveHistory: async (employeeId) => {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.leaveRequests.byEmployee(
                employeeId
            )
        );

        return response.data;
    },

    getManagerPendingRequests: async (managerId) => {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.leaveRequests.pendingByManager(
                managerId
            )
        );

        return response.data;
    },

    processLeaveRequest: async (requestId, approvalData) => {
        const response = await axiosInstance.patch(
            API_CONFIG.endpoints.leaveRequests.process(
                requestId
            ),
            approvalData
        );

        return response.data;
    },
};

export default leaveRequestService;