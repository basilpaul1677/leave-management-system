import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Select from "../common/Select";
import Input from "../common/Input";

const LeaveApprovalModal = ({
    isOpen,
    onClose,
    onSubmit,
    leaveRequest,
    loading = false,
}) => {
    const [status, setStatus] = useState("");
    const [comments, setComments] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) {
            setStatus("");
            setComments("");
            setError("");
        }
    }, [isOpen]);

    if (!leaveRequest) {
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!status) {
            setError("Please select an approval status.");
            return;
        }

        setError("");

        await onSubmit({
            status,
            comments: comments.trim(),
        });
    };

    const statusOptions = [
        {
            value: "APPROVED",
            label: "Approve",
        },
        {
            value: "REJECTED",
            label: "Reject",
        },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Process Leave Request"
        >
            <form
                className="leave-approval-form"
                onSubmit={handleSubmit}
            >
                <div className="leave-approval-summary">
                    <div className="leave-approval-summary-item">
                        <span className="summary-label">
                            Employee
                        </span>

                        <span className="summary-value">
                            {leaveRequest.employeeName ||
                                leaveRequest.employeeId}
                        </span>
                    </div>

                    <div className="leave-approval-summary-item">
                        <span className="summary-label">
                            Leave Type
                        </span>

                        <span className="summary-value">
                            {leaveRequest.leaveTypeName ||
                                leaveRequest.leaveType}
                        </span>
                    </div>

                    <div className="leave-approval-summary-item">
                        <span className="summary-label">
                            Start Date
                        </span>

                        <span className="summary-value">
                            {leaveRequest.startDate || "-"}
                        </span>
                    </div>

                    <div className="leave-approval-summary-item">
                        <span className="summary-label">
                            End Date
                        </span>

                        <span className="summary-value">
                            {leaveRequest.endDate || "-"}
                        </span>
                    </div>
                </div>

                <Select
                    label="Decision"
                    name="status"
                    value={status}
                    onChange={(event) =>
                        setStatus(event.target.value)
                    }
                    options={statusOptions}
                    placeholder="Select decision"
                    required
                />

                <Input
                    label="Comments"
                    name="comments"
                    value={comments}
                    onChange={(event) =>
                        setComments(event.target.value)
                    }
                    placeholder="Enter comments (optional)"
                    multiline
                    rows={4}
                />

                {error && (
                    <div className="form-error-message">
                        {error}
                    </div>
                )}

                <div className="modal-actions">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        disabled={loading}
                    >
                        Submit Decision
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default LeaveApprovalModal;