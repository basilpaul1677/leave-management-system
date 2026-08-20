import axios from 'axios';

import API_CONFIG from './apiConfig';

const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,

    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },

    timeout: 15000,
});

export default axiosInstance;