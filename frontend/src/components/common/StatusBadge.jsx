import React from "react";

const StatusBadge = ({
    status,
    label,
    className = ""
}) => {
    const normalizedStatus =
        String(status || "")
            .toLowerCase()
            .replace(/\s+/g, "-");

    const displayLabel =
        label ||
        String(status || "Unknown")
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) =>
                char.toUpperCase()
            );

    return (
        <span
            className={`status-badge status-${normalizedStatus} ${className}`}
        >
            <span className="status-dot" />

            {displayLabel}
        </span>
    );
};

export default StatusBadge;