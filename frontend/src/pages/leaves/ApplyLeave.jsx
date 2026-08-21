import { useNavigate } from "react-router-dom";

import LeaveRequestForm from "../../components/leave/LeaveRequestForm";
import leaveRequestService from "../../services/leaveRequestService";
import { useAuth } from "../../hooks/useAuth";

const ApplyLeave = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSubmit = async (formData) => {
        try {
            await leaveRequestService.applyLeave(
                user.id,
                formData
            );

            navigate("/leaves");
        } catch (error) {
            throw (
                error?.response?.data?.message ||
                "Unable to submit leave request."
            );
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Apply Leave</h1>
                    <p className="page-subtitle">
                        Submit a new leave request.
                    </p>
                </div>
            </div>

            <div className="content-card">
                <LeaveRequestForm
                    onSubmit={handleSubmit}
                    onCancel={() => navigate("/leaves")}
                />
            </div>
        </div>
    );
};

export default ApplyLeave;