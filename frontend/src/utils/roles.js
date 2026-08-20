export const ROLES = {
    EMPLOYEE: 'EMPLOYEE',
    MANAGER: 'MANAGER',
    ADMIN: 'ADMIN',
};

export const isEmployee = (role) =>
    role === ROLES.EMPLOYEE;

export const isManager = (role) =>
    role === ROLES.MANAGER;

export const isAdmin = (role) =>
    role === ROLES.ADMIN;

export const isManagerOrAdmin = (role) =>
    role === ROLES.MANAGER ||
    role === ROLES.ADMIN;

export const isAuthenticatedRole = (role) =>
    Object.values(ROLES).includes(role);