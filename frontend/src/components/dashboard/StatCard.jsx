import React from "react";

const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    variant = "primary"
}) => {
    return (
        <div className={`dashboard-stat-card stat-${variant}`}>
            <div className="stat-card-content">
                <div className="stat-card-header">
                    <span className="stat-card-title">
                        {title}
                    </span>

                    <div className="stat-card-icon">
                        {icon}
                    </div>
                </div>

                <div className="stat-card-value">
                    {value}
                </div>

                {subtitle && (
                    <div className="stat-card-subtitle">
                        {subtitle}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;