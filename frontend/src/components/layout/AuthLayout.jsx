import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <div className="auth-background">
                <div className="auth-background-shape auth-shape-one"></div>
                <div className="auth-background-shape auth-shape-two"></div>
                <div className="auth-background-shape auth-shape-three"></div>
            </div>

            <main className="auth-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;