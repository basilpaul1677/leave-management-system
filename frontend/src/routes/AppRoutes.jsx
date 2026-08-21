import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

/* Layouts */
import MainLayout from "../components/layout/MainLayout";
import AuthLayout from "../components/layout/AuthLayout";

/* Route Guards */
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";

/* Authentication */
import Login from "../pages/auth/Login";
import AuthUnauthorized from "../pages/auth/Unauthorized";

/* Dashboard */
import Dashboard from "../pages/dashboard/Dashboard";

/* Employees */
import Employees from "../pages/employees/Employees";
import EmployeeDetails from "../pages/employees/EmployeeDetails";
import EditEmployee from "../pages/employees/EditEmployee";

/* Leaves */
import MyLeaves from "../pages/leaves/MyLeaves";
import ApplyLeave from "../pages/leaves/ApplyLeave";
import LeaveDetails from "../pages/leaves/LeaveDetails";
import PendingLeaves from "../pages/leaves/PendingLeaves";
import LeaveBalances from "../pages/leaves/LeaveBalances";

/* Leave Types */
import LeaveTypes from "../pages/leave-types/LeaveTypes";
import CreateLeaveType from "../pages/leave-types/CreateLeaveType";
import EditLeaveType from "../pages/leave-types/EditLeaveType";

/* Notifications */
import Notifications from "../pages/notifications/Notifications";

/* Profile */
import Profile from "../pages/profile/Profile";

/* Errors */
import NotFound from "../pages/errors/NotFound";
import ServerError from "../pages/errors/ServerError";

const AppRoutes = () => {
    return (
        <Routes>

            {/* =====================================================
                PUBLIC ROUTES
            ===================================================== */}

            <Route element={<AuthLayout />}>
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/unauthorized"
                    element={<AuthUnauthorized />}
                />
            </Route>


            {/* =====================================================
                AUTHENTICATED ROUTES
            ===================================================== */}

            <Route element={<ProtectedRoute />}>

                <Route element={<MainLayout />}>

                    {/* Dashboard */}
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />


                    {/* =================================================
                        EMPLOYEE ROUTES
                    ================================================= */}

                    <Route
                        element={
                            <RoleBasedRoute
                                allowedRoles={[
                                    "EMPLOYEE",
                                    "MANAGER",
                                    "ADMIN",
                                ]}
                            />
                        }
                    >
                        <Route
                            path="/employees/:id"
                            element={<EmployeeDetails />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />
                    </Route>


                    {/* Employee management */}
                    <Route
                        element={
                            <RoleBasedRoute
                                allowedRoles={[
                                    "MANAGER",
                                    "ADMIN",
                                ]}
                            />
                        }
                    >
                        <Route
                            path="/employees"
                            element={<Employees />}
                        />

                        <Route
                            path="/employees/:id/edit"
                            element={<EditEmployee />}
                        />
                    </Route>


                    {/* =================================================
                        LEAVE ROUTES
                    ================================================= */}

                    {/* Employee / Manager / Admin */}
                    <Route
                        element={
                            <RoleBasedRoute
                                allowedRoles={[
                                    "EMPLOYEE",
                                    "MANAGER",
                                    "ADMIN",
                                ]}
                            />
                        }
                    >
                        <Route
                            path="/leaves"
                            element={<MyLeaves />}
                        />

                        <Route
                            path="/leaves/apply"
                            element={<ApplyLeave />}
                        />

                        <Route
                            path="/leaves/:id"
                            element={<LeaveDetails />}
                        />

                        <Route
                            path="/leaves/balances"
                            element={<LeaveBalances />}
                        />
                    </Route>


                    {/* Manager / Admin */}
                    <Route
                        element={
                            <RoleBasedRoute
                                allowedRoles={[
                                    "MANAGER",
                                    "ADMIN",
                                ]}
                            />
                        }
                    >
                        <Route
                            path="/leaves/pending"
                            element={<PendingLeaves />}
                        />
                    </Route>


                    {/* =================================================
                        LEAVE TYPE ROUTES
                    ================================================= */}

                    <Route
                        element={
                            <RoleBasedRoute
                                allowedRoles={["ADMIN"]}
                            />
                        }
                    >
                        <Route
                            path="/leave-types"
                            element={<LeaveTypes />}
                        />

                        <Route
                            path="/leave-types/create"
                            element={<CreateLeaveType />}
                        />

                        <Route
                            path="/leave-types/:id/edit"
                            element={<EditLeaveType />}
                        />
                    </Route>


                    {/* =================================================
                        NOTIFICATION ROUTES
                    ================================================= */}

                    <Route
                        element={
                            <RoleBasedRoute
                                allowedRoles={[
                                    "EMPLOYEE",
                                    "MANAGER",
                                    "ADMIN",
                                ]}
                            />
                        }
                    >
                        <Route
                            path="/notifications"
                            element={<Notifications />}
                        />
                    </Route>


                    {/* =================================================
                        ERROR ROUTES
                    ================================================= */}

                    <Route
                        path="/server-error"
                        element={<ServerError />}
                    />

                </Route>

            </Route>


            {/* =====================================================
                DEFAULT ROUTE
            ===================================================== */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />


            {/* =====================================================
                404
            ===================================================== */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
};

export default AppRoutes;