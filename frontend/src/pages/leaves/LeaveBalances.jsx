import { useEffect, useState } from "react";

import LeaveBalanceTable from "../../components/leave/LeaveBalanceTable";
import PageLoader from "../../components/common/PageLoader";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";

import leaveBalanceService from "../../services/leaveBalanceService";
import { useAuth } from "../../hooks/useAuth";

const LeaveBalances = () => {
    const { user } = useAuth();

    const [balances, setBalances] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadBalances = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response =
                    await leaveBalanceService.getEmployeeLeaveBalances(
                        user.id,
                        year
                    );

                setBalances(response?.data ?? response ?? []);
            } catch (err) {
                setError(
                    err?.response?.data?.message ||
                    "Unable to load leave balances."
                );
            } finally {
                setLoading(false);
            }
        };

        loadBalances();
    }, [user?.id, year]);

    if (loading) {
        return <PageLoader />;
    }

    if (error) {
        return (
            <ErrorState
                title="Unable to load leave balances"
                message={error}
            />
        );
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Leave Balances
                    </h1>
                    <p className="page-subtitle">
                        Check your allocated, used and remaining leave days.
                    </p>
                </div>

                <div className="page-header-actions">
                    <select
                        className="form-select"
                        value={year}
                        onChange={(event) =>
                            setYear(Number(event.target.value))
                        }
                    >
                        <option value={year - 1}>
                            {year - 1}
                        </option>

                        <option value={year}>
                            {year}
                        </option>

                        <option value={year + 1}>
                            {year + 1}
                        </option>
                    </select>
                </div>
            </div>

            {balances.length === 0 ? (
                <EmptyState
                    title="No leave balance available"
                    message={`No leave balance records were found for ${year}.`}
                />
            ) : (
                <div className="content-card">
                    <LeaveBalanceTable balances={balances} />
                </div>
            )}
        </div>
    );
};

export default LeaveBalances;