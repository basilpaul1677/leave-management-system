import axiosInstance from './api/axiosInstance';
import API_CONFIG from './api/apiConfig';

const authService = {
    async login(credentials) {
        const response = await axiosInstance.post(
            API_CONFIG.ENDPOINTS.AUTH.LOGIN,
            credentials
        );

        return response.data;
    },

    async register(employeeData) {
        const response = await axiosInstance.post(
            API_CONFIG.ENDPOINTS.AUTH.REGISTER,
            employeeData
        );

        return response.data;
    },
};

export default authService;