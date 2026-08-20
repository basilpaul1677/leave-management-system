import React from "react";

const LoadingSpinner = ({
    size = "medium",
    text = "",
    className = ""
}) => {
    return (
        <div
            className={`loading-container loading-${size} ${className}`}
            role="status"
            aria-live="polite"
        >
            <span className="loading-spinner" />

            {text && (
                <span className="loading-text">
                    {text}
                </span>
            )}
        </div>
    );
};

export default LoadingSpinner;