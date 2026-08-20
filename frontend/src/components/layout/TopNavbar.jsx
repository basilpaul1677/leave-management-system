import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { useTheme } from "../../hooks/useTheme";

const TopNavbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const firstName = user?.firstName || "User";
    const lastName = user?.lastName || "";
    const role = user?.role || "USER";

    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`
        .toUpperCase();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="top-navbar">

            {/* Left section */}
            <div className="navbar-left">

                {/* Mobile menu button */}
                <button
                    type="button"
                    className="mobile-menu-button"
                    aria-label="Open navigation menu"
                >
                    <i className="bi bi-list"></i>
                </button>

                <div className="navbar-title-wrapper">
                    <h1 className="navbar-title">
                        Leave Management
                    </h1>

                    <span className="navbar-subtitle">
                        Manage your work life with ease
                    </span>
                </div>

            </div>

            {/* Right section */}
            <div className="navbar-right">

                {/* Theme Toggle */}
                <button
                    type="button"
                    className="navbar-icon-button"
                    onClick={toggleTheme}
                    title={
                        theme === "dark"
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                    aria-label="Toggle theme"
                >
                    <i
                        className={
                            theme === "dark"
                                ? "bi bi-sun"
                                : "bi bi-moon-stars"
                        }
                    ></i>
                </button>

                {/* Notifications */}
                <Link
                    to="/notifications"
                    className="navbar-icon-button notification-button"
                    title="Notifications"
                    aria-label="Notifications"
                >
                    <i className="bi bi-bell"></i>

                    <span className="notification-dot"></span>
                </Link>

                {/* Divider */}
                <div className="navbar-divider"></div>

                {/* User Profile */}
                <Link
                    to="/profile"
                    className="navbar-user"
                >
                    <div className="navbar-user-avatar">
                        {initials || "U"}
                    </div>

                    <div className="navbar-user-info">
                        <span className="navbar-user-name">
                            {firstName} {lastName}
                        </span>

                        <span className="navbar-user-role">
                            {role}
                        </span>
                    </div>

                    <i className="bi bi-chevron-down navbar-user-arrow"></i>
                </Link>

                {/* Logout */}
                <button
                    type="button"
                    className="navbar-logout-button"
                    onClick={handleLogout}
                    title="Logout"
                    aria-label="Logout"
                >
                    <i className="bi bi-box-arrow-right"></i>
                </button>

            </div>

        </header>
    );
};

export default TopNavbar;