import React from "react";
import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to continue?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
    variant = "danger"
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="small"
            closeOnOverlayClick={!loading}
        >
            <div className="confirm-dialog">
                <div className="confirm-dialog-icon">
                    !
                </div>

                <p className="confirm-dialog-message">
                    {message}
                </p>

                <div className="confirm-dialog-actions">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>

                    <Button
                        type="button"
                        variant={variant}
                        onClick={onConfirm}
                        loading={loading}
                        disabled={loading}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;