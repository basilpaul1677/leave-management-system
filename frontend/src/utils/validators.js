export const isRequired = (value) => {
    return (
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ""
    );
};

export const isValidEmail = (email) => {
    if (!email) {
        return false;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
};

export const isValidPassword = (password) => {
    return (
        typeof password === "string" &&
        password.length >= 6
    );
};

export const isValidEmployeeCode = (
    employeeCode
) => {
    if (!employeeCode) {
        return false;
    }

    return (
        employeeCode.trim().length > 0 &&
        employeeCode.trim().length <= 20
    );
};

export const isValidName = (name) => {
    if (!name) {
        return false;
    }

    return (
        name.trim().length >= 2 &&
        name.trim().length <= 50
    );
};

export const validateLeaveDates = (
    startDate,
    endDate
) => {
    if (!startDate || !endDate) {
        return {
            valid: false,
            message:
                "Start date and end date are required.",
        };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (
        Number.isNaN(start.getTime()) ||
        Number.isNaN(end.getTime())
    ) {
        return {
            valid: false,
            message: "Please provide valid dates.",
        };
    }

    if (end < start) {
        return {
            valid: false,
            message:
                "End date must be after or equal to start date.",
        };
    }

    return {
        valid: true,
        message: "",
    };
};

export const validateLeaveReason = (reason) => {
    if (!reason || !reason.trim()) {
        return {
            valid: false,
            message: "Leave reason is required.",
        };
    }

    if (reason.trim().length > 500) {
        return {
            valid: false,
            message:
                "Leave reason cannot exceed 500 characters.",
        };
    }

    return {
        valid: true,
        message: "",
    };
};