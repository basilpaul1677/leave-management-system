import { useEffect, useState } from "react";

import LeaveRequestTable from "../../components/leave/LeaveRequestTable";
import PageLoader from "../../components/common/PageLoader";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";

import leaveRequestService from "../../services/leaveRequestService";
import { useAuth } from "../../hooks/useAuth";

const PendingLeaves = () => {
    const { user } = useAuth();

    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPendingLeaves = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response =
                    await leaveRequestService.getManagerPendingRequests(
                        user.id
                    );

                setLeaves(response?.data ?? response ?? []);
            } catch (err) {
                setError(
                    err?.response?.data?.message ||
                    "Unable to load pending leave requests."
                );
            } finally {
                setLoading(false);
            }
        };

        loadPendingLeaves();
    }, [user?.id]);

    if (loading) {
        return <PageLoader />;
    }

    if (error) {
        return (
            <ErrorState
                title="Unable to load pending leaves"
                message={error}
            />
        );
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Pending Leave Requests
                    </h1>
                    <p className="page-subtitle">
                        Review and process employee leave requests.
                    </p>
                </div>
            </div>

            {leaves.length === 0 ? (
                <EmptyState
                    title="No pending requests"
                    message="There are currently no leave requests waiting for approval."
                />
            ) : (
                <LeaveRequestTable leaves={leaves} />
            )}
        </div>
    );
};

export default PendingLeaves;