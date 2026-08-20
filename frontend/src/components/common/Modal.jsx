import React, { useEffect } from "react";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = "medium",
    showCloseButton = true,
    closeOnOverlayClick = true,
    className = ""
}) => {
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const handleOverlayClick = (event) => {
        if (
            closeOnOverlayClick &&
            event.target === event.currentTarget
        ) {
            onClose();
        }
    };

    return (
        <div
            className="modal-overlay"
            onMouseDown={handleOverlayClick}
        >
            <div
                className={`modal-container modal-${size} ${className}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="modal-header">
                    <h2 id="modal-title" className="modal-title">
                        {title}
                    </h2>

                    {showCloseButton && (
                        <button
                            type="button"
                            className="modal-close"
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                    )}
                </div>

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;