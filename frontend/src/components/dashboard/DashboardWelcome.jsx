import React from "react";
import { useAuth } from "../../hooks/useAuth";

const DashboardWelcome = () => {
    const { user } = useAuth();

    const firstName =
        user?.firstName ||
        user?.name ||
        user?.email?.split("@")[0] ||
        "User";

    return (
        <div className="dashboard-welcome">
            <div className="dashboard-welcome-content">
                <span className="dashboard-welcome-label">
                    Welcome back
                </span>

                <h1>
                    Hello, {firstName} 👋
                </h1>

                <p>
                    Manage your leaves, balances and requests
                    from one place.
                </p>
            </div>

            <div className="dashboard-welcome-decoration">
                <div className="welcome-decoration-circle circle-one"></div>
                <div className="welcome-decoration-circle circle-two"></div>
                <div className="welcome-decoration-circle circle-three"></div>
            </div>
        </div>
    );
};

export default DashboardWelcome;