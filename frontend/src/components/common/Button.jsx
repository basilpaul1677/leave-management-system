import PropTypes from "prop-types";

const Button = ({
    children,
    type = "button",
    variant = "primary",
    size = "medium",
    loading = false,
    disabled = false,
    fullWidth = false,
    icon = null,
    iconPosition = "left",
    onClick,
    className = "",
}) => {
    const buttonClasses = [
        "app-button",
        `app-button-${variant}`,
        `app-button-${size}`,
        fullWidth ? "app-button-full" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? (
                <>
                    <span
                        className="button-spinner"
                        aria-hidden="true"
                    ></span>

                    <span>Processing...</span>
                </>
            ) : (
                <>
                    {icon && iconPosition === "left" && (
                        <span className="button-icon">
                            {icon}
                        </span>
                    )}

                    <span>{children}</span>

                    {icon && iconPosition === "right" && (
                        <span className="button-icon">
                            {icon}
                        </span>
                    )}
                </>
            )}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,

    type: PropTypes.oneOf([
        "button",
        "submit",
        "reset",
    ]),

    variant: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "outline",
        "ghost",
    ]),

    size: PropTypes.oneOf([
        "small",
        "medium",
        "large",
    ]),

    loading: PropTypes.bool,

    disabled: PropTypes.bool,

    fullWidth: PropTypes.bool,

    icon: PropTypes.node,

    iconPosition: PropTypes.oneOf([
        "left",
        "right",
    ]),

    onClick: PropTypes.func,

    className: PropTypes.string,
};

export default Button;