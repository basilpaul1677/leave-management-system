import React from "react";
import { Link } from "react-router-dom";
import RoleBadge from "../common/RoleBadge";
import StatusBadge from "../common/StatusBadge";

const EmployeeCard = ({ employee }) => {

    if (!employee) {
        return null;
    }

    return (
        <div className="employee-card">

            <div className="employee-card-header">

                <div className="employee-card-profile">

                    <div className="employee-avatar employee-avatar-large">
                        {employee.firstName?.charAt(0)}
                        {employee.lastName?.charAt(0)}
                    </div>

                    <div>
                        <h3>
                            {employee.firstName}{" "}
                            {employee.lastName}
                        </h3>

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

            <div className="employee-card-body">

                <div className="employee-info-item">
                    <span className="employee-info-label">
                        Email
                    </span>

                    <span className="employee-info-value">
                        {employee.email}
                    </span>
                </div>

                <div className="employee-info-item">
                    <span className="employee-info-label">
                        Department
                    </span>

                    <span className="employee-info-value">
                        {employee.department}
                    </span>
                </div>

                <div className="employee-info-item">
                    <span className="employee-info-label">
                        Role
                    </span>

                    <span className="employee-info-value">
                        <RoleBadge role={employee.role} />
                    </span>
                </div>

                <div className="employee-info-item">
                    <span className="employee-info-label">
                        Joining Date
                    </span>

                    <span className="employee-info-value">
                        {employee.joiningDate || "-"}
                    </span>
                </div>

            </div>

            <div className="employee-card-footer">

                <Link
                    to={`/employees/${employee.id}`}
                    className="employee-card-button"
                >
                    View Details
                </Link>

                <Link
                    to={`/employees/${employee.id}/edit`}
                    className="employee-card-button secondary"
                >
                    Edit
                </Link>

            </div>

        </div>
    );
};

export default EmployeeCard;