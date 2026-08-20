import React from "react";

const Select = ({
    label,
    name,
    value = "",
    onChange,
    options = [],
    placeholder = "Select an option",
    required = false,
    disabled = false,
    error = "",
    helperText = "",
    className = "",
    id,
    ...props
}) => {
    const selectId = id || name;

    return (
        <div className={`form-field ${className}`}>
            {label && (
                <label htmlFor={selectId} className="form-label">
                    {label}

                    {required && (
                        <span className="required-mark"> *</span>
                    )}
                </label>
            )}

            <select
                id={selectId}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`form-control ${
                    error ? "form-control-error" : ""
                }`}
                {...props}
            >
                <option value="" disabled>
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

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

export default Select;