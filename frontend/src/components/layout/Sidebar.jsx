import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
    const { user } = useAuth();

    const role = user?.role;

    const menuItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: "bi-speedometer2",
            roles: ["EMPLOYEE", "MANAGER", "ADMIN"],
        },
        {
            label: "My Leaves",
            path: "/leaves",
            icon: "bi-calendar-check",
            roles: ["EMPLOYEE", "MANAGER", "ADMIN"],
        },
        {
            label: "Apply Leave",
            path: "/leaves/apply",
            icon: "bi-plus-circle",
            roles: ["EMPLOYEE"],
        },
        {
            label: "Leave Balances",
            path: "/leave-balances",
            icon: "bi-wallet2",
            roles: ["EMPLOYEE", "MANAGER", "ADMIN"],
        },
        {
            label: "Pending Leaves",
            path: "/leaves/pending",
            icon: "bi-hourglass-split",
            roles: ["MANAGER", "ADMIN"],
        },
        {
            label: "Employees",
            path: "/employees",
            icon: "bi-people",
            roles: ["MANAGER", "ADMIN"],
        },
        {
            label: "Leave Types",
            path: "/leave-types",
            icon: "bi-tags",
            roles: ["ADMIN"],
        },
        {
            label: "Notifications",
            path: "/notifications",
            icon: "bi-bell",
            roles: ["EMPLOYEE", "MANAGER", "ADMIN"],
        },
        {
            label: "Profile",
            path: "/profile",
            icon: "bi-person-circle",
            roles: ["EMPLOYEE", "MANAGER", "ADMIN"],
        },
    ];

    const visibleMenuItems = menuItems.filter((item) =>
        item.roles.includes(role)
    );

    return (
        <aside className="sidebar">

            {/* Logo / Brand */}
            <div className="sidebar-brand">
                <div className="sidebar-logo">
                    <i className="bi bi-calendar2-check"></i>
                </div>

                <div className="sidebar-brand-text">
                    <span className="brand-title">
                        Leave<span>Flow</span>
                    </span>

                    <span className="brand-subtitle">
                        Management System
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-navigation">

                <div className="sidebar-section-title">
                    MAIN MENU
                </div>

                {visibleMenuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span className="sidebar-link-icon">
                            <i className={`bi ${item.icon}`}></i>
                        </span>

                        <span className="sidebar-link-label">
                            {item.label}
                        </span>
                    </NavLink>
                ))}

            </nav>

            {/* Bottom section */}
            <div className="sidebar-footer">

                <div className="sidebar-role-card">
                    <div className="role-card-icon">
                        <i className="bi bi-shield-check"></i>
                    </div>

                    <div className="role-card-content">
                        <span className="role-card-label">
                            Current Role
                        </span>

                        <span className="role-card-value">
                            {role || "USER"}
                        </span>
                    </div>
                </div>

            </div>

        </aside>
    );
};

export default Sidebar;