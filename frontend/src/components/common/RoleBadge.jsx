import React from "react";

const RoleBadge = ({
    role,
    className = ""
}) => {
    const normalizedRole =
        String(role || "")
            .toLowerCase();

    const roleLabels = {
        employee: "Employee",
        manager: "Manager",
        admin: "Administrator"
    };

    const displayLabel =
        roleLabels[normalizedRole] ||
        role ||
        "Unknown";

    return (
        <span
            className={`role-badge role-${normalizedRole} ${className}`}
        >
            {displayLabel}
        </span>
    );
};

export default RoleBadge;