import React from "react";

const Input = ({
    label,
    name,
    type = "text",
    value = "",
    onChange,
    onBlur,
    placeholder = "",
    required = false,
    disabled = false,
    readOnly = false,
    error = "",
    helperText = "",
    className = "",
    min,
    max,
    step,
    autoComplete,
    id,
    ...props
}) => {
    const inputId = id || name;

    return (
        <div className={`form-field ${className}`}>
            {label && (
                <label htmlFor={inputId} className="form-label">
                    {label}

                    {required && (
                        <span className="required-mark"> *</span>
                    )}
                </label>
            )}

            <input
                id={inputId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
                min={min}
                max={max}
                step={step}
                autoComplete={autoComplete}
                className={`form-control ${
                    error ? "form-control-error" : ""
                }`}
                {...props}
            />

            {error && (
                <div className="form-error">
                    {error}
                </div>
            )}

            {!error && helperText && (
                <div className="form-helper">
                    {helperText}
                </div>
            )}
        </div>
    );
};

export default Input;