import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import LeaveRequestDetails from "../../components/leave/LeaveRequestDetails";
import PageLoader from "../../components/common/PageLoader";
import ErrorState from "../../components/common/ErrorState";

import leaveRequestService from "../../services/leaveRequestService";

const LeaveDetails = () => {
    const { id } = useParams();

    const [leave, setLeave] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadLeave = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await leaveRequestService.getLeaveRequestById(id);

                setLeave(response?.data ?? response);
            } catch (err) {
                setError(
                    err?.response?.data?.message ||
                    "Unable to load leave request."
                );
            } finally {
                setLoading(false);
            }
        };

        loadLeave();
    }, [id]);

    if (loading) {
        return <PageLoader />;
    }

    if (error) {
        return (
            <ErrorState
                title="Leave request unavailable"
                message={error}
            />
        );
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Leave Request Details
                    </h1>
                    <p className="page-subtitle">
                        View the complete details of this leave request.
                    </p>
                </div>

                <Link
                    to="/leaves"
                    className="btn btn-outline-secondary"
                >
                    Back to My Leaves
                </Link>
            </div>

            <div className="content-card">
                <LeaveRequestDetails leave={leave} />
            </div>
        </div>
    );
};

export default LeaveDetails;