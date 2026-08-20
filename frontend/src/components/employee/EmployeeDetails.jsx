import React from "react";
import RoleBadge from "../common/RoleBadge";
import StatusBadge from "../common/StatusBadge";

const EmployeeDetails = ({ employee, loading = false }) => {

    if (loading) {
        return (
            <div className="employee-details-card">
                <div className="employee-details-loading">
                    <div className="loading-spinner-small"></div>
                    <span>Loading employee details...</span>
                </div>
            </div>
        );
    }

    if (!employee) {
        return (
            <div className="employee-details-card">
                <div className="employee-details-empty">
                    Employee details are not available.
                </div>
            </div>
        );
    }

    return (
        <div className="employee-details-card">

            <div className="employee-details-header">

                <div className="employee-details-profile">

                    <div className="employee-avatar employee-avatar-xl">
                        {employee.firstName?.charAt(0)}
                        {employee.lastName?.charAt(0)}
                    </div>

                    <div className="employee-details-heading">

                        <h2>
                            {employee.firstName}{" "}
                            {employee.lastName}
                        </h2>

                        <p>
                            {employee.employeeCode}
                        </p>

                    </div>

                </div>

                <StatusBadge
                    status={
                        employee.active
                            ? "ACTIVE"
                            : "INACTIVE"
                    }
                />

            </div>

            <div className="employee-details-section">

                <h3>Personal Information</h3>

                <div className="employee-details-grid">

                    <div className="employee-detail-item">
                        <span>First Name</span>
                        <strong>
                            {employee.firstName || "-"}
                        </strong>
                    </div>

                    <div className="employee-detail-item">
                        <span>Last Name</span>
                        <strong>
                            {employee.lastName || "-"}
                        </strong>
                    </div>

                    <div className="employee-detail-item">
                        <span>Email</span>
                        <strong>
                            {employee.email || "-"}
                        </strong>
                    </div>

                    <div className="employee-detail-item">
                        <span>Employee Code</span>
                        <strong>
                            {employee.employeeCode || "-"}
                        </strong>
                    </div>

                </div>

            </div>

            <div className="employee-details-section">

                <h3>Employment Information</h3>

                <div className="employee-details-grid">

                    <div className="employee-detail-item">
                        <span>Department</span>
                        <strong>
                            {employee.department || "-"}
                        </strong>
                    </div>

                    <div className="employee-detail-item">
                        <span>Role</span>
                        <strong>
                            <RoleBadge role={employee.role} />
                        </strong>
                    </div>

                    <div className="employee-detail-item">
                        <span>Manager ID</span>
                        <strong>
                            {employee.managerId || "-"}
                        </strong>
                    </div>

                    <div className="employee-detail-item">
                        <span>Joining Date</span>
                        <strong>
                            {employee.joiningDate || "-"}
                        </strong>
                    </div>

                </div>

            </div>

            <div className="employee-details-section">

                <h3>Account Information</h3>

                <div className="employee-details-grid">

                    <div className="employee-detail-item">
                        <span>Account Status</span>
                        <strong>
                            {employee.active
                                ? "Active"
                                : "Inactive"}
                        </strong>
                    </div>

                    <div className="employee-detail-item">
                        <span>Created At</span>
                        <strong>
                            {employee.createdAt || "-"}
                        </strong>
                    </div>

                    <div className="employee-detail-item">
                        <span>Updated At</span>
                        <strong>
                            {employee.updatedAt || "-"}
                        </strong>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default EmployeeDetails;