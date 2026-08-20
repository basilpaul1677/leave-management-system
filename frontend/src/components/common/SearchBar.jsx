import React from "react";

const SearchBar = ({
    value = "",
    onChange,
    placeholder = "Search...",
    onClear,
    className = ""
}) => {
    return (
        <div className={`search-bar ${className}`}>
            <span className="search-icon">
                ⌕
            </span>

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="search-input"
                aria-label="Search"
            />

            {value && onClear && (
                <button
                    type="button"
                    className="search-clear"
                    onClick={onClear}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default SearchBar;