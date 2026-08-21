import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LeaveRequestTable from "../../components/leave/LeaveRequestTable";
import PageLoader from "../../components/common/PageLoader";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";

import leaveRequestService from "../../services/leaveRequestService";
import { useAuth } from "../../hooks/useAuth";

const MyLeaves = () => {
    const { user } = useAuth();

    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadLeaves = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response =
                    await leaveRequestService.getEmployeeLeaveHistory(
                        user.id
                    );

                setLeaves(response?.data ?? response ?? []);
            } catch (err) {
                setError(
                    err?.response?.data?.message ||
                    "Unable to load your leave requests."
                );
            } finally {
                setLoading(false);
            }
        };

        loadLeaves();
    }, [user?.id]);

    if (loading) {
        return <PageLoader />;
    }

    if (error) {
        return (
            <ErrorState
                title="Unable to load leaves"
                message={error}
            />
        );
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">My Leaves</h1>
                    <p className="page-subtitle">
                        View and track your leave requests.
                    </p>
                </div>

                <Link
                    to="/leaves/apply"
                    className="btn btn-primary"
                >
                    Apply Leave
                </Link>
            </div>

            {leaves.length === 0 ? (
                <EmptyState
                    title="No leave requests"
                    message="You haven't submitted any leave requests yet."
                />
            ) : (
                <LeaveRequestTable leaves={leaves} />
            )}
        </div>
    );
};

export default MyLeaves;