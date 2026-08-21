import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LeaveTypeForm from "../../components/leave/LeaveTypeForm";
import PageLoader from "../../components/common/PageLoader";
import ErrorState from "../../components/common/ErrorState";

import leaveTypeService from "../../services/leaveTypeService";

const EditLeaveType = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [leaveType, setLeaveType] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const loadLeaveType = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await leaveTypeService.getLeaveTypeById(id);

            setLeaveType(response?.data ?? response);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Unable to load leave type."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            loadLeaveType();
        }
    }, [id]);

    const handleSubmit = async (formData) => {
        try {
            setSaving(true);
            setError("");

            await leaveTypeService.updateLeaveType(
                id,
                formData
            );

            navigate("/leave-types");
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Unable to update leave type."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate("/leave-types");
    };

    if (loading) {
        return <PageLoader />;
    }

    if (error && !leaveType) {
        return (
            <ErrorState
                title="Unable to load leave type"
                message={error}
                onRetry={loadLeaveType}
            />
        );
    }

    return (
        <div className="page-container">

            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Edit Leave Type
                    </h1>

                    <p className="page-subtitle">
                        Update the selected leave type.
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

                {leaveType && (
                    <LeaveTypeForm
                        leaveType={leaveType}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        isSubmitting={saving}
                    />
                )}

            </div>

        </div>
    );
};

export default EditLeaveType;