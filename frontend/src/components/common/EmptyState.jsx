import React from "react";
import Button from "./Button";

const EmptyState = ({
    title = "No data found",
    message = "There is nothing to display at the moment.",
    icon = "📭",
    actionText = "",
    onAction,
    className = ""
}) => {
    return (
        <div className={`empty-state ${className}`}>
            <div className="empty-state-icon">
                {icon}
            </div>

            <h3 className="empty-state-title">
                {title}
            </h3>

            <p className="empty-state-message">
                {message}
            </p>

            {actionText && onAction && (
                <Button
                    type="button"
                    variant="primary"
                    onClick={onAction}
                >
                    {actionText}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;