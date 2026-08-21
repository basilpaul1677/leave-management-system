import axiosInstance from "./api/axiosInstance";
import API_CONFIG from "./api/apiConfig";

const leaveTypeService = {
    getAllLeaveTypes: async () => {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.leaveTypes.base
        );

        return response.data;
    },

    getLeaveTypeById: async (id) => {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.leaveTypes.byId(id)
        );

        return response.data;
    },

    createLeaveType: async (leaveTypeData) => {
        const response = await axiosInstance.post(
            API_CONFIG.endpoints.leaveTypes.base,
            leaveTypeData
        );

        return response.data;
    },

    updateLeaveType: async (id, leaveTypeData) => {
        const response = await axiosInstance.put(
            API_CONFIG.endpoints.leaveTypes.byId(id),
            leaveTypeData
        );

        return response.data;
    },

    deactivateLeaveType: async (id) => {
        const response = await axiosInstance.patch(
            API_CONFIG.endpoints.leaveTypes.deactivate(id)
        );

        return response.data;
    },
};

export default leaveTypeService;