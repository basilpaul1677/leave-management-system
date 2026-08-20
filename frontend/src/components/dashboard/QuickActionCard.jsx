import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActionCard = ({
    title,
    description,
    icon,
    path,
    variant = "primary"
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (path) {
            navigate(path);
        }
    };

    return (
        <button
            type="button"
            className={`quick-action-card quick-action-${variant}`}
            onClick={handleClick}
        >
            <div className="quick-action-icon">
                {icon}
            </div>

            <div className="quick-action-content">
                <h3>{title}</h3>

                <p>{description}</p>
            </div>

            <span className="quick-action-arrow">
                →
            </span>
        </button>
    );
};

export default QuickActionCard;