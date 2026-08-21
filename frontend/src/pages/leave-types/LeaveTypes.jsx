import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LeaveTypeTable from "../../components/leave/LeaveTypeTable";
import PageLoader from "../../components/common/PageLoader";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";

import leaveTypeService from "../../services/leaveTypeService";
import { useAuth } from "../../hooks/useAuth";

const LeaveTypes = () => {
    const { user } = useAuth();

    const [leaveTypes, setLeaveTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const isAdmin = user?.role === "ADMIN";

    const loadLeaveTypes = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await leaveTypeService.getAllLeaveTypes();

            setLeaveTypes(response?.data ?? response ?? []);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Unable to load leave types."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLeaveTypes();
    }, []);

    if (loading) {
        return <PageLoader />;
    }

    if (error) {
        return (
            <ErrorState
                title="Unable to load leave types"
                message={error}
                onRetry={loadLeaveTypes}
            />
        );
    }

    return (
        <div className="page-container">

            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Leave Types
                    </h1>

                    <p className="page-subtitle">
                        View and manage the leave types available
                        in the organization.
                    </p>
                </div>

                {isAdmin && (
                    <Link
                        to="/leave-types/create"
                        className="btn btn-primary"
                    >
                        + Create Leave Type
                    </Link>
                )}
            </div>

            {leaveTypes.length === 0 ? (
                <EmptyState
                    title="No leave types found"
                    message="There are currently no leave types configured."
                />
            ) : (
                <div className="content-card">

                    <LeaveTypeTable
                        leaveTypes={leaveTypes}
                        isAdmin={isAdmin}
                        onRefresh={loadLeaveTypes}
                    />

                </div>
            )}

        </div>
    );
};

export default LeaveTypes;