import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import PageLoader from "../components/common/PageLoader";

const RoleBasedRoute = ({ allowedRoles = [] }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <PageLoader />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const userRole = user.role?.toUpperCase();

    const hasPermission =
        allowedRoles.length === 0 ||
        allowedRoles.some(
            (role) =>
                role.toUpperCase() === userRole
        );

    if (!hasPermission) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default RoleBasedRoute;