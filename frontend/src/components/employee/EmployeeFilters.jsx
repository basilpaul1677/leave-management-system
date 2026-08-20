import React from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const EmployeeFilters = ({
    filters,
    onChange,
    onReset,
}) => {

    const currentFilters = filters || {
        search: "",
        department: "",
        role: "",
        status: "",
    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        onChange?.({
            ...currentFilters,
            [name]: value,
        });
    };

    return (
        <div className="employee-filters">

            <div className="employee-filter-header">

                <div>
                    <h3>Employee Filters</h3>
                    <p>
                        Search and filter employees.
                    </p>
                </div>

                <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={onReset}
                >
                    Reset
                </Button>

            </div>

            <div className="employee-filter-grid">

                <Input
                    label="Search"
                    name="search"
                    value={currentFilters.search}
                    onChange={handleChange}
                    placeholder="Search by name or email..."
                />

                <Input
                    label="Department"
                    name="department"
                    value={currentFilters.department}
                    onChange={handleChange}
                    placeholder="e.g. Engineering"
                />

                <Select
                    label="Role"
                    name="role"
                    value={currentFilters.role}
                    onChange={handleChange}
                    options={[
                        {
                            value: "",
                            label: "All Roles",
                        },
                        {
                            value: "EMPLOYEE",
                            label: "Employee",
                        },
                        {
                            value: "MANAGER",
                            label: "Manager",
                        },
                        {
                            value: "ADMIN",
                            label: "Administrator",
                        },
                    ]}
                />

                <Select
                    label="Status"
                    name="status"
                    value={currentFilters.status}
                    onChange={handleChange}
                    options={[
                        {
                            value: "",
                            label: "All Statuses",
                        },
                        {
                            value: "ACTIVE",
                            label: "Active",
                        },
                        {
                            value: "INACTIVE",
                            label: "Inactive",
                        },
                    ]}
                />

            </div>

        </div>
    );
};

export default EmployeeFilters;