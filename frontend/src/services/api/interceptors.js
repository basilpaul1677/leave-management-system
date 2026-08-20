import axiosInstance from './axiosInstance';
import storage from '../../utils/storage';

/**
 * Request interceptor
 *
 * Automatically attaches the JWT to authenticated requests.
 */
axiosInstance.interceptors.request.use(
    (config) => {
        const token = storage.getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor
 *
 * Handles common HTTP responses centrally.
 */
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        if (!error.response) {
            console.error(
                'Network error: Unable to connect to API Gateway.'
            );

            return Promise.reject(error);
        }

        const status = error.response.status;

        switch (status) {
            case 401:
                console.warn(
                    '401 Unauthorized: Authentication required.'
                );
                break;

            case 403:
                console.warn(
                    '403 Forbidden: Insufficient permissions.'
                );
                break;

            case 404:
                console.warn(
                    '404 Not Found: Resource not found.'
                );
                break;

            case 500:
                console.error(
                    '500 Internal Server Error.'
                );
                break;

            default:
                break;
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;