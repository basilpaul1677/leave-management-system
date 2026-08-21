export const LEAVE_STATUS = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    CANCELLED: "CANCELLED",
};

export const LEAVE_STATUS_LABELS = {
    [LEAVE_STATUS.PENDING]: "Pending",
    [LEAVE_STATUS.APPROVED]: "Approved",
    [LEAVE_STATUS.REJECTED]: "Rejected",
    [LEAVE_STATUS.CANCELLED]: "Cancelled",
};

export const LEAVE_STATUS_VARIANTS = {
    [LEAVE_STATUS.PENDING]: "warning",
    [LEAVE_STATUS.APPROVED]: "success",
    [LEAVE_STATUS.REJECTED]: "danger",
    [LEAVE_STATUS.CANCELLED]: "secondary",
};

export const getLeaveStatusLabel = (status) => {
    return (
        LEAVE_STATUS_LABELS[status] ||
        status ||
        "Unknown"
    );
};

export const getLeaveStatusVariant = (status) => {
    return (
        LEAVE_STATUS_VARIANTS[status] ||
        "secondary"
    );
};

export const isPending = (status) =>
    status === LEAVE_STATUS.PENDING;

export const isApproved = (status) =>
    status === LEAVE_STATUS.APPROVED;

export const isRejected = (status) =>
    status === LEAVE_STATUS.REJECTED;

export const isCancelled = (status) =>
    status === LEAVE_STATUS.CANCELLED;