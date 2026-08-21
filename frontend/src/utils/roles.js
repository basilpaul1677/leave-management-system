export const ROLES = {
    EMPLOYEE: "EMPLOYEE",
    MANAGER: "MANAGER",
    ADMIN: "ADMIN",
};

export const ROLE_LABELS = {
    [ROLES.EMPLOYEE]: "Employee",
    [ROLES.MANAGER]: "Manager",
    [ROLES.ADMIN]: "Administrator",
};

export const ROLE_PERMISSIONS = {
    [ROLES.EMPLOYEE]: [
        "VIEW_DASHBOARD",
        "VIEW_PROFILE",
        "APPLY_LEAVE",
        "VIEW_OWN_LEAVES",
        "VIEW_LEAVE_BALANCE",
        "VIEW_NOTIFICATIONS",
    ],

    [ROLES.MANAGER]: [
        "VIEW_DASHBOARD",
        "VIEW_PROFILE",
        "VIEW_EMPLOYEES",
        "VIEW_EMPLOYEE_DETAILS",
        "APPLY_LEAVE",
        "VIEW_OWN_LEAVES",
        "VIEW_LEAVE_BALANCE",
        "VIEW_PENDING_LEAVES",
        "APPROVE_LEAVE",
        "VIEW_NOTIFICATIONS",
    ],

    [ROLES.ADMIN]: [
        "VIEW_DASHBOARD",
        "VIEW_PROFILE",
        "VIEW_EMPLOYEES",
        "VIEW_EMPLOYEE_DETAILS",
        "EDIT_EMPLOYEE",
        "APPLY_LEAVE",
        "VIEW_OWN_LEAVES",
        "VIEW_LEAVE_BALANCE",
        "VIEW_PENDING_LEAVES",
        "APPROVE_LEAVE",
        "MANAGE_LEAVE_TYPES",
        "VIEW_NOTIFICATIONS",
        "DELETE_NOTIFICATION",
    ],
};

export const hasRole = (userRole, allowedRoles = []) => {
    if (!userRole) {
        return false;
    }

    if (!allowedRoles.length) {
        return true;
    }

    return allowedRoles.some(
        (role) =>
            role.toUpperCase() ===
            userRole.toUpperCase()
    );
};

export const hasPermission = (
    userRole,
    permission
) => {
    if (!userRole) {
        return false;
    }

    const permissions =
        ROLE_PERMISSIONS[userRole.toUpperCase()] || [];

    return permissions.includes(permission);
};