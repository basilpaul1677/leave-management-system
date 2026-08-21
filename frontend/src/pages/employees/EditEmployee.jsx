import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/common/Button";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorState from "../../components/common/ErrorState";

import EmployeeForm from "../../components/employee/EmployeeForm";

import employeeService from "../../services/employeeService";
import { ROUTES } from "../../utils/constants";

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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
                "Unable to load employee information."
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

    const handleSubmit = async (formData) => {
        try {
            setIsSaving(true);
            setError("");
            setSuccessMessage("");

            await employeeService.updateEmployee(
                id,
                formData
            );

            setSuccessMessage(
                "Employee information updated successfully."
            );

            setTimeout(() => {
                navigate(
                    `${ROUTES.EMPLOYEES}/${id}`
                );
            }, 800);

        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Unable to update employee. Please try again."
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        navigate(
            `${ROUTES.EMPLOYEES}/${id}`
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
                        Edit Employee
                    </h1>

                    <p className="page-description">
                        Update employee account information.
                    </p>
                </div>

                <Button
                    variant="secondary"
                    onClick={handleCancel}
                    disabled={isSaving}
                >
                    ← Cancel
                </Button>

            </div>

            <div className="page-content">

                {isLoading && (
                    <div className="page-loading">
                        <LoadingSpinner />
                        <p>Loading employee information...</p>
                    </div>
                )}

                {!isLoading && error && !employee && (
                    <ErrorState
                        message={error}
                        onRetry={loadEmployee}
                    />
                )}

                {!isLoading && employee && (
                    <div className="form-card">

                        {error && (
                            <div
                                className="form-error-message"
                                role="alert"
                            >
                                {error}
                            </div>
                        )}

                        {successMessage && (
                            <div
                                className="form-success-message"
                                role="status"
                            >
                                {successMessage}
                            </div>
                        )}

                        <div className="form-card-header">
                            <h2>
                                Employee Information
                            </h2>

                            <p>
                                Modify the fields below and save
                                the changes.
                            </p>
                        </div>

                        <EmployeeForm
                            employee={employee}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            isSubmitting={isSaving}
                        />

                    </div>
                )}

            </div>

        </div>
    );
};

export default EditEmployee;