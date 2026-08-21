import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import RoleBadge from "../../components/common/RoleBadge";

import EmployeeTable from "../../components/employee/EmployeeTable";
import EmployeeFilters from "../../components/employee/EmployeeFilters";

import employeeService from "../../services/employeeService";
import { ROUTES } from "../../utils/constants";

const Employees = () => {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const loadEmployees = async () => {
        try {
            setIsLoading(true);
            setError("");

            const response = await employeeService.getAllEmployees();

            const data = response?.data ?? response ?? [];

            setEmployees(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Unable to load employees. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const visibleEmployees = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return employees.filter((employee) => {
            const matchesSearch =
                !search ||
                employee.employeeCode?.toLowerCase().includes(search) ||
                employee.firstName?.toLowerCase().includes(search) ||
                employee.lastName?.toLowerCase().includes(search) ||
                employee.email?.toLowerCase().includes(search) ||
                employee.department?.toLowerCase().includes(search);

            const matchesRole =
                roleFilter === "ALL" ||
                employee.role === roleFilter;

            const matchesStatus =
                statusFilter === "ALL" ||
                (statusFilter === "ACTIVE" && employee.active === true) ||
                (statusFilter === "INACTIVE" && employee.active === false);

            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );
        });
    }, [
        employees,
        searchTerm,
        roleFilter,
        statusFilter,
    ]);

    useEffect(() => {
        setFilteredEmployees(visibleEmployees);
    }, [visibleEmployees]);

    const handleViewEmployee = (employee) => {
        navigate(
            `${ROUTES.EMPLOYEES}/${employee.id}`
        );
    };

    const handleEditEmployee = (employee) => {
        navigate(
            `${ROUTES.EMPLOYEES}/${employee.id}/edit`
        );
    };

    const handleClearFilters = () => {
        setSearchTerm("");
        setRoleFilter("ALL");
        setStatusFilter("ALL");
    };

    return (
        <div className="page-container">

            <div className="page-header">
                <div>
                    <span className="page-eyebrow">
                        EMPLOYEE MANAGEMENT
                    </span>

                    <h1 className="page-title">
                        Employees
                    </h1>

                    <p className="page-description">
                        View and manage employees in the leave
                        management system.
                    </p>
                </div>

                <div className="page-header-actions">
                    <Button
                        variant="secondary"
                        onClick={loadEmployees}
                        disabled={isLoading}
                    >
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="page-toolbar">

                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search employees..."
                />

                <EmployeeFilters
                    roleFilter={roleFilter}
                    statusFilter={statusFilter}
                    onRoleChange={setRoleFilter}
                    onStatusChange={setStatusFilter}
                    onClear={handleClearFilters}
                />

            </div>

            <div className="page-content">

                {isLoading && (
                    <div className="page-loading">
                        <LoadingSpinner />
                        <p>Loading employees...</p>
                    </div>
                )}

                {!isLoading && error && (
                    <ErrorState
                        message={error}
                        onRetry={loadEmployees}
                    />
                )}

                {!isLoading &&
                    !error &&
                    employees.length === 0 && (
                        <EmptyState
                            title="No employees found"
                            message="There are currently no employees available."
                        />
                    )}

                {!isLoading &&
                    !error &&
                    employees.length > 0 &&
                    filteredEmployees.length === 0 && (
                        <EmptyState
                            title="No matching employees"
                            message="Try changing your search or filters."
                        />
                    )}

                {!isLoading &&
                    !error &&
                    filteredEmployees.length > 0 && (
                        <div className="data-card">

                            <div className="data-card-header">
                                <div>
                                    <h2>
                                        Employee Directory
                                    </h2>

                                    <p>
                                        {filteredEmployees.length}{" "}
                                        employee
                                        {filteredEmployees.length !== 1
                                            ? "s"
                                            : ""}
                                    </p>
                                </div>

                                <div className="employee-role-summary">
                                    <RoleBadge role="EMPLOYEE" />
                                </div>
                            </div>

                            <EmployeeTable
                                employees={filteredEmployees}
                                onView={handleViewEmployee}
                                onEdit={handleEditEmployee}
                            />

                        </div>
                    )}

            </div>

        </div>
    );
};

export default Employees;