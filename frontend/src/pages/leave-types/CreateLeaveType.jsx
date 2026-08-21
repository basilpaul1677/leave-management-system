import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LeaveTypeForm from "../../components/leave/LeaveTypeForm";
import leaveTypeService from "../../services/leaveTypeService";

const CreateLeaveType = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (formData) => {
        try {
            setSaving(true);
            setError("");

            await leaveTypeService.createLeaveType(formData);

            navigate("/leave-types");
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Unable to create leave type."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate("/leave-types");
    };

    return (
        <div className="page-container">

            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Create Leave Type
                    </h1>

                    <p className="page-subtitle">
                        Add a new leave type to the system.
                    </p>
                </div>
            </div>

            <div className="content-card">

                {error && (
                    <div
                        className="form-error-message"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                <LeaveTypeForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isSubmitting={saving}
                />

            </div>

        </div>
    );
};

export default CreateLeaveType;