import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import authService from '../services/authService';
import storage from '../utils/storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(
        () => storage.getUser()
    );

    const [loading, setLoading] = useState(true);

    const isAuthenticated = Boolean(
        storage.getAccessToken() && user
    );

    useEffect(() => {
        setLoading(false);
    }, []);

    const login = useCallback(async (credentials) => {
        const response =
            await authService.login(credentials);

        const token =
            response.token ||
            response.accessToken;

        if (!token) {
            throw new Error(
                'Login successful but authentication token was not returned.'
            );
        }

        const authenticatedUser = {
            employeeId: response.employeeId,
            employeeCode: response.employeeCode,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            role: response.role,
        };

        storage.setAccessToken(token);
        storage.setUser(authenticatedUser);

        setUser(authenticatedUser);

        return authenticatedUser;
    }, []);

    const logout = useCallback(() => {
        storage.clear();
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({
            user,
            loading,
            isAuthenticated,
            login,
            logout,
        }),
        [
            user,
            loading,
            isAuthenticated,
            login,
            logout,
        ]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}