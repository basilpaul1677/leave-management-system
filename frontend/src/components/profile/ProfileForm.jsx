import React, { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";

const ProfileForm = ({
    employee,
    onSubmit,
    onCancel,
    loading = false,
}) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        managerId: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (employee) {
            setFormData({
                firstName: employee.firstName || "",
                lastName: employee.lastName || "",
                email: employee.email || "",
                department: employee.department || "",
                managerId:
                    employee.managerId !== null &&
                    employee.managerId !== undefined
                        ? String(employee.managerId)
                        : "",
            });
        }
    }, [employee]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }));
    };

    const validate = () => {
        const validationErrors = {};

        if (!formData.firstName.trim()) {
            validationErrors.firstName =
                "First name is required.";
        }

        if (!formData.lastName.trim()) {
            validationErrors.lastName =
                "Last name is required.";
        }

        if (!formData.email.trim()) {
            validationErrors.email =
                "Email address is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email
            )
        ) {
            validationErrors.email =
                "Enter a valid email address.";
        }

        if (!formData.department.trim()) {
            validationErrors.department =
                "Department is required.";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const payload = {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            department: formData.department.trim(),
            managerId: formData.managerId
                ? Number(formData.managerId)
                : null,
        };

        await onSubmit?.(payload);
    };

    return (
        <form
            className="profile-form"
            onSubmit={handleSubmit}
        >
            <div className="profile-form-header">
                <div>
                    <h4>Edit Profile</h4>

                    <p>
                        Update your employee information.
                    </p>
                </div>
            </div>

            <div className="profile-form-grid">

                <div className="profile-form-field">
                    <Input
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                    />

                    {errors.firstName && (
                        <small className="profile-form-error">
                            {errors.firstName}
                        </small>
                    )}
                </div>

                <div className="profile-form-field">
                    <Input
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                    />

                    {errors.lastName && (
                        <small className="profile-form-error">
                            {errors.lastName}
                        </small>
                    )}
                </div>

                <div className="profile-form-field">
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                    />

                    {errors.email && (
                        <small className="profile-form-error">
                            {errors.email}
                        </small>
                    )}
                </div>

                <div className="profile-form-field">
                    <Input
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Enter department"
                        required
                    />

                    {errors.department && (
                        <small className="profile-form-error">
                            {errors.department}
                        </small>
                    )}
                </div>

                <div className="profile-form-field">
                    <Input
                        label="Manager ID"
                        type="number"
                        name="managerId"
                        value={formData.managerId}
                        onChange={handleChange}
                        placeholder="Enter manager ID"
                        min="1"
                    />
                </div>
            </div>

            <div className="profile-form-actions">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    <X size={17} />
                    Cancel
                </Button>

                <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    disabled={loading}
                >
                    <Save size={17} />
                    Save Changes
                </Button>
            </div>
        </form>
    );
};

export default ProfileForm;