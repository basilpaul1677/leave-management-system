import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/common/Button";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorState from "../../components/common/ErrorState";
import RoleBadge from "../../components/common/RoleBadge";

import EmployeeDetailsComponent from "../../components/employee/EmployeeDetails";

import employeeService from "../../services/employeeService";
import { ROUTES } from "../../utils/constants";

const EmployeeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const loadEmployee = async () => {
        try {
            setIsLoading(true);
            setError("");

            const response =
                await employeeService.getEmployeeById(id);

            const data = response?.data ?? response;

            setEmployee(data);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Unable to load employee details."
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            loadEmployee();
        }
    }, [id]);

    const handleBack = () => {
        navigate(ROUTES.EMPLOYEES);
    };

    const handleEdit = () => {
        navigate(
            `${ROUTES.EMPLOYEES}/${id}/edit`
        );
    };

    return (
        <div className="page-container">

            <div className="page-header">

                <div>
                    <span className="page-eyebrow">
                        EMPLOYEE MANAGEMENT
                    </span>

                    <h1 className="page-title">
                        Employee Details
                    </h1>

                    <p className="page-description">
                        View employee information and account details.
                    </p>
                </div>

                <div className="page-header-actions">

                    <Button
                        variant="secondary"
                        onClick={handleBack}
                    >
                        ← Back
                    </Button>

                    {employee && (
                        <Button
                            variant="primary"
                            onClick={handleEdit}
                        >
                            Edit Employee
                        </Button>
                    )}

                </div>

            </div>

            <div className="page-content">

                {isLoading && (
                    <div className="page-loading">
                        <LoadingSpinner />
                        <p>Loading employee details...</p>
                    </div>
                )}

                {!isLoading && error && (
                    <ErrorState
                        message={error}
                        onRetry={loadEmployee}
                    />
                )}

                {!isLoading &&
                    !error &&
                    employee && (
                        <div className="employee-details-page">

                            <div className="employee-details-summary">

                                <div className="employee-details-avatar">
                                    {employee.firstName
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>

                                <div>
                                    <h2>
                                        {employee.firstName}{" "}
                                        {employee.lastName}
                                    </h2>

                                    <p>
                                        {employee.email}
                                    </p>
                                </div>

                                <RoleBadge
                                    role={employee.role}
                                />

                            </div>

                            <EmployeeDetailsComponent
                                employee={employee}
                            />

                        </div>
                    )}

            </div>

        </div>
    );
};

export default EmployeeDetails;