import React from "react";
import { Link } from "react-router-dom";
import RoleBadge from "../common/RoleBadge";
import StatusBadge from "../common/StatusBadge";
import Button from "../common/Button";

const EmployeeTable = ({
    employees = [],
    loading = false,
    onDelete,
}) => {

    if (loading) {
        return (
            <div className="employee-table-wrapper">
                <div className="table-loading">
                    <div className="loading-spinner-small"></div>
                    <span>Loading employees...</span>
                </div>
            </div>
        );
    }

    if (!employees.length) {
        return (
            <div className="employee-table-wrapper">
                <div className="employee-table-empty">
                    <div className="empty-icon">👥</div>
                    <h3>No employees found</h3>
                    <p>
                        There are no employees matching the current criteria.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="employee-table-wrapper">
            <div className="table-responsive">
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Employee Code</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Joining Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>

                                <td>
                                    <div className="employee-table-profile">

                                        <div className="employee-avatar">
                                            {employee.firstName?.charAt(0)}
                                            {employee.lastName?.charAt(0)}
                                        </div>

                                        <div className="employee-table-name">
                                            <strong>
                                                {employee.firstName}{" "}
                                                {employee.lastName}
                                            </strong>

                                            <span>
                                                {employee.email}
                                            </span>
                                        </div>

                                    </div>
                                </td>

                                <td>
                                    <span className="employee-code">
                                        {employee.employeeCode}
                                    </span>
                                </td>

                                <td>
                                    {employee.department}
                                </td>

                                <td>
                                    <RoleBadge role={employee.role} />
                                </td>

                                <td>
                                    {employee.joiningDate || "-"}
                                </td>

                                <td>
                                    <StatusBadge
                                        status={
                                            employee.active
                                                ? "ACTIVE"
                                                : "INACTIVE"
                                        }
                                    />
                                </td>

                                <td>
                                    <div className="employee-actions">

                                        <Link
                                            to={`/employees/${employee.id}`}
                                            className="table-action view"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            to={`/employees/${employee.id}/edit`}
                                            className="table-action edit"
                                        >
                                            Edit
                                        </Link>

                                        {onDelete && (
                                            <Button
                                                variant="danger"
                                                size="small"
                                                onClick={() =>
                                                    onDelete(employee)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        )}

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;