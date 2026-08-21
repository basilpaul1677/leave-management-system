import axiosInstance from "./api/axiosInstance";
import API_CONFIG from "./api/apiConfig";

const leaveBalanceService = {
    getEmployeeLeaveBalances: async (employeeId, year) => {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.leaveBalances.byEmployee(
                employeeId
            ),
            {
                params: {
                    year,
                },
            }
        );

        return response.data;
    },
};

export default leaveBalanceService;