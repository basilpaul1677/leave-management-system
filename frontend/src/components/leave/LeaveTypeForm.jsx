import React, { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

const LeaveTypeForm = ({
    initialData = null,
    onSubmit,
    onCancel,
    loading = false,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        defaultDays: "",
    });

    const [errors, setErrors] = useState({});

    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                description:
                    initialData.description || "",
                defaultDays:
                    initialData.defaultDays ??
                    initialData.allocatedDays ??
                    "",
            });
        } else {
            setFormData({
                name: "",
                description: "",
                defaultDays: "",
            });
        }

        setErrors({});
    }, [initialData]);

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

        if (!formData.name.trim()) {
            validationErrors.name =
                "Leave type name is required.";
        }

        if (
            formData.name.trim().length > 50
        ) {
            validationErrors.name =
                "Leave type name must not exceed 50 characters.";
        }

        if (
            formData.defaultDays === "" ||
            Number(formData.defaultDays) <= 0
        ) {
            validationErrors.defaultDays =
                "Default days must be greater than 0.";
        }

        return validationErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        const request = {
            name: formData.name.trim(),
            description: formData.description.trim(),
            defaultDays: Number(
                formData.defaultDays
            ),
        };

        await onSubmit(request);
    };

    return (
        <form
            className="leave-type-form"
            onSubmit={handleSubmit}
        >
            <div className="form-section">
                <div className="form-section-header">
                    <h3>
                        {isEditMode
                            ? "Edit Leave Type"
                            : "Create Leave Type"}
                    </h3>

                    <p>
                        Configure the leave type and
                        its default allocation.
                    </p>
                </div>

                <Input
                    label="Leave Type Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Annual Leave"
                    error={errors.name}
                    required
                />

                <Input
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe this leave type"
                    multiline
                    rows={4}
                />

                <Input
                    label="Default Days"
                    name="defaultDays"
                    type="number"
                    min="1"
                    value={formData.defaultDays}
                    onChange={handleChange}
                    placeholder="e.g. 20"
                    error={errors.defaultDays}
                    required
                />
            </div>

            <div className="form-actions">
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
                    {isEditMode
                        ? "Update Leave Type"
                        : "Create Leave Type"}
                </Button>
            </div>
        </form>
    );
};

export default LeaveTypeForm;