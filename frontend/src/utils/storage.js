import { STORAGE_KEYS } from "./constants";

export const setToken = (token) => {
    if (token) {
        localStorage.setItem(
            STORAGE_KEYS.TOKEN,
            token
        );
    }
};

export const getToken = () => {
    return localStorage.getItem(
        STORAGE_KEYS.TOKEN
    );
};

export const removeToken = () => {
    localStorage.removeItem(
        STORAGE_KEYS.TOKEN
    );
};

export const setUser = (user) => {
    if (user) {
        localStorage.setItem(
            STORAGE_KEYS.USER,
            JSON.stringify(user)
        );
    }
};

export const getUser = () => {
    const storedUser =
        localStorage.getItem(
            STORAGE_KEYS.USER
        );

    if (!storedUser) {
        return null;
    }

    try {
        return JSON.parse(storedUser);
    } catch {
        localStorage.removeItem(
            STORAGE_KEYS.USER
        );

        return null;
    }
};

export const removeUser = () => {
    localStorage.removeItem(
        STORAGE_KEYS.USER
    );
};

export const clearStorage = () => {
    removeToken();
    removeUser();
};