import React from "react";
import Button from "./Button";

const ErrorState = ({
    title = "Something went wrong",
    message = "We were unable to load the requested information.",
    retryText = "Try Again",
    onRetry,
    className = ""
}) => {
    return (
        <div className={`error-state ${className}`}>
            <div className="error-state-icon">
                ⚠
            </div>

            <h3 className="error-state-title">
                {title}
            </h3>

            <p className="error-state-message">
                {message}
            </p>

            {onRetry && (
                <Button
                    type="button"
                    variant="primary"
                    onClick={onRetry}
                >
                    {retryText}
                </Button>
            )}
        </div>
    );
};

export default ErrorState;