import { Link, useLocation } from "react-router-dom";

const routeLabels = {
    dashboard: "Dashboard",

    employees: "Employees",
    "employee-details": "Employee Details",
    "edit-employee": "Edit Employee",

    leaves: "Leaves",
    "my-leaves": "My Leaves",
    "apply-leave": "Apply Leave",
    "leave-details": "Leave Details",
    "pending-leaves": "Pending Leaves",
    "leave-balances": "Leave Balances",

    "leave-types": "Leave Types",
    "create-leave-type": "Create Leave Type",
    "edit-leave-type": "Edit Leave Type",

    notifications: "Notifications",

    profile: "Profile",

    unauthorized: "Unauthorized",
};

const formatSegment = (segment) => {
    if (routeLabels[segment]) {
        return routeLabels[segment];
    }

    return segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
};

const Breadcrumb = () => {
    const location = useLocation();

    const pathname = location.pathname;

    const segments = pathname
        .split("/")
        .filter(Boolean);

    // Dashboard is the application home page.
    if (
        pathname === "/" ||
        pathname === "/dashboard"
    ) {
        return (
            <div className="breadcrumb-wrapper">
                <nav
                    className="breadcrumb-container"
                    aria-label="breadcrumb"
                >
                    <Link
                        to="/dashboard"
                        className="breadcrumb-item breadcrumb-home"
                    >
                        <i className="bi bi-house-door"></i>
                        <span>Dashboard</span>
                    </Link>
                </nav>
            </div>
        );
    }

    return (
        <div className="breadcrumb-wrapper">
            <nav
                className="breadcrumb-container"
                aria-label="breadcrumb"
            >
                {/* Home */}
                <Link
                    to="/dashboard"
                    className="breadcrumb-item breadcrumb-home"
                >
                    <i className="bi bi-house-door"></i>
                    <span>Dashboard</span>
                </Link>

                {segments.map((segment, index) => {
                    const isLast =
                        index === segments.length - 1;

                    const path =
                        "/" +
                        segments
                            .slice(0, index + 1)
                            .join("/");

                    const label =
                        formatSegment(segment);

                    /*
                     * Numeric IDs such as /employees/1
                     * should not be displayed as raw IDs.
                     */
                    const isId =
                        /^\d+$/.test(segment);

                    if (isId) {
                        return (
                            <span
                                key={`${segment}-${index}`}
                                className={
                                    `breadcrumb-item ${
                                        isLast
                                            ? "breadcrumb-current"
                                            : ""
                                    }`
                                }
                            >
                                {isLast ? (
                                    <span>
                                        Details
                                    </span>
                                ) : (
                                    <Link to={path}>
                                        Details
                                    </Link>
                                )}
                            </span>
                        );
                    }

                    return (
                        <span
                            key={`${segment}-${index}`}
                            className={
                                `breadcrumb-item ${
                                    isLast
                                        ? "breadcrumb-current"
                                        : ""
                                }`
                            }
                        >
                            <span className="breadcrumb-separator">
                                <i className="bi bi-chevron-right"></i>
                            </span>

                            {isLast ? (
                                <span>
                                    {label}
                                </span>
                            ) : (
                                <Link to={path}>
                                    {label}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </nav>
        </div>
    );
};

export default Breadcrumb;