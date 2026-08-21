import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

export const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = "leave_management_theme";

const getInitialTheme = () => {
    const storedTheme = localStorage.getItem(
        THEME_STORAGE_KEY
    );

    if (
        storedTheme === "light" ||
        storedTheme === "dark"
    ) {
        return storedTheme;
    }

    return "light";
};

const ThemeContextProvider = ({ children }) => {
    const [theme, setThemeState] =
        useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;

        root.setAttribute("data-theme", theme);

        localStorage.setItem(
            THEME_STORAGE_KEY,
            theme
        );
    }, [theme]);

    const setTheme = useCallback((newTheme) => {
        if (
            newTheme !== "light" &&
            newTheme !== "dark"
        ) {
            return;
        }

        setThemeState(newTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        setThemeState((currentTheme) =>
            currentTheme === "light"
                ? "dark"
                : "light"
        );
    }, []);

    const isDarkMode = theme === "dark";

    const value = useMemo(
        () => ({
            theme,
            setTheme,
            toggleTheme,
            isDarkMode,
        }),
        [
            theme,
            setTheme,
            toggleTheme,
            isDarkMode,
        ]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;