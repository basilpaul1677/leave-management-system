import axiosInstance from "./api/axiosInstance";
import API_CONFIG from "./api/apiConfig";

const employeeService = {
    getAllEmployees: async () => {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.employees.base
        );

        return response.data;
    },

    getEmployeeById: async (id) => {
        const response = await axiosInstance.get(
            API_CONFIG.endpoints.employees.byId(id)
        );

        return response.data;
    },

    updateEmployee: async (id, employeeData) => {
        const response = await axiosInstance.put(
            API_CONFIG.endpoints.employees.update(id),
            employeeData
        );

        return response.data;
    },
};

export default employeeService;