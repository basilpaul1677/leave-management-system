import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";
import MainLayout from "../components/layout/MainLayout";

import Login from "../pages/auth/Login";
import Unauthorized from "../pages/auth/Unauthorized";

import Dashboard from "../pages/dashboard/Dashboard";

import NotFound from "../pages/errors/NotFound";

const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>

                {/* =====================================
                    AUTHENTICATION ROUTES
                    ===================================== */}

                <Route element={<AuthLayout />}>

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/unauthorized"
                        element={<Unauthorized />}
                    />

                </Route>


                {/* =====================================
                    APPLICATION ROUTES
                    ===================================== */}

                <Route element={<MainLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                </Route>


                {/* =====================================
                    ERROR ROUTES
                    ===================================== */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>
    );
};

export default AppRoutes;