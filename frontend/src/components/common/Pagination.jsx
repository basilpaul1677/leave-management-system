import React from "react";
import Button from "./Button";

const Pagination = ({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    className = ""
}) => {
    if (totalPages <= 1) {
        return null;
    }

    const pages = [];

    for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
    }

    return (
        <div className={`pagination ${className}`}>
            <Button
                type="button"
                variant="secondary"
                size="small"
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
            >
                Previous
            </Button>

            <div className="pagination-pages">
                {pages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        className={`pagination-page ${
                            page === currentPage
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            onPageChange(page)
                        }
                        aria-current={
                            page === currentPage
                                ? "page"
                                : undefined
                        }
                    >
                        {page}
                    </button>
                ))}
            </div>

            <Button
                type="button"
                variant="secondary"
                size="small"
                disabled={currentPage === totalPages}
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
            >
                Next
            </Button>
        </div>
    );
};

export default Pagination;