const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'currentUser';

export const storage = {
    setAccessToken(token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    },

    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    removeAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    },

    setUser(user) {
        localStorage.setItem(
            USER_KEY,
            JSON.stringify(user)
        );
    },

    getUser() {
        const user = localStorage.getItem(USER_KEY);

        if (!user) {
            return null;
        }

        try {
            return JSON.parse(user);
        } catch (error) {
            console.error(
                'Unable to parse stored user information.',
                error
            );

            localStorage.removeItem(USER_KEY);

            return null;
        }
    },

    removeUser() {
        localStorage.removeItem(USER_KEY);
    },

    clear() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }
};

export default storage;