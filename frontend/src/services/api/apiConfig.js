/**
 * Central API configuration.
 *
 * The React application communicates only with the API Gateway.
 * Individual microservice ports must never be used directly
 * from frontend components.
 */

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_CONFIG = {
    BASE_URL: API_BASE_URL,

    ENDPOINTS: {
        AUTH: {
            LOGIN: '/api/v1/auth/login',
            REGISTER: '/api/v1/auth/register',
        },

        EMPLOYEES: {
            BASE: '/api/v1/employees',
        },

        LEAVE_REQUESTS: {
            BASE: '/api/v1/leave-requests',
        },

        LEAVE_BALANCES: {
            BASE: '/api/v1/leave-balances',
        },

        LEAVE_TYPES: {
            BASE: '/api/v1/leave-types',
        },

        NOTIFICATIONS: {
            BASE: '/api/v1/notifications',
        },
    },
};

export default API_CONFIG;