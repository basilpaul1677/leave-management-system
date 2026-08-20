import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

const EmployeeForm = ({
    initialData = {},
    onSubmit,
    onCancel,
    loading = false,
    mode = "create",
}) => {

    const [formData, setFormData] = useState({
        employeeCode: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        department: "",
        role: "EMPLOYEE",
        managerId: "",
        joiningDate: "",
        active: true,
    });

    useEffect(() => {

        setFormData({
            employeeCode: initialData.employeeCode || "",
            firstName: initialData.firstName || "",
            lastName: initialData.lastName || "",
            email: initialData.email || "",
            password: "",
            department: initialData.department || "",
            role: initialData.role || "EMPLOYEE",
            managerId: initialData.managerId || "",
            joiningDate: initialData.joiningDate || "",
            active:
                initialData.active !== undefined
                    ? initialData.active
                    : true,
        });

    }, [initialData]);

    const handleChange = (event) => {

        const { name, value, type, checked } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        const payload = {
            ...formData,
            managerId:
                formData.managerId === ""
                    ? null
                    : Number(formData.managerId),
        };

        if (mode === "edit" || !payload.password) {
            delete payload.password;
        }

        onSubmit?.(payload);
    };

    return (
        <form
            className="employee-form"
            onSubmit={handleSubmit}
        >

            <div className="form-section">

                <div className="form-section-header">
                    <h3>Employee Information</h3>
                    <p>
                        Enter the employee's basic information.
                    </p>
                </div>

                <div className="form-grid">

                    <Input
                        label="Employee Code"
                        name="employeeCode"
                        value={formData.employeeCode}
                        onChange={handleChange}
                        placeholder="EMP001"
                        required
                        disabled={mode === "edit"}
                    />

                    <Input
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                    />

                    <Input
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                    />

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                    />

                </div>

            </div>

            <div className="form-section">

                <div className="form-section-header">
                    <h3>Employment Information</h3>
                    <p>
                        Configure the employee's organizational details.
                    </p>
                </div>

                <div className="form-grid">

                    <Input
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Engineering"
                        required
                    />

                    <Select
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        options={[
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
                        required
                    />

                    <Input
                        label="Manager ID"
                        name="managerId"
                        type="number"
                        value={formData.managerId}
                        onChange={handleChange}
                        placeholder="Optional"
                    />

                    <Input
                        label="Joining Date"
                        name="joiningDate"
                        type="date"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>

            <div className="form-section">

                <div className="form-section-header">
                    <h3>Account Settings</h3>
                    <p>
                        Configure login and account status.
                    </p>
                </div>

                <div className="form-grid">

                    {mode === "create" && (
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                    )}

                    {mode === "edit" && (
                        <div className="form-checkbox-wrapper">

                            <label className="form-checkbox-label">

                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={formData.active}
                                    onChange={handleChange}
                                />

                                <span>
                                    Active Account
                                </span>

                            </label>

                        </div>
                    )}

                </div>

            </div>

            <div className="employee-form-actions">

                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    disabled={loading}
                >
                    {mode === "edit"
                        ? "Update Employee"
                        : "Create Employee"}
                </Button>

            </div>

        </form>
    );
};

export default EmployeeForm;