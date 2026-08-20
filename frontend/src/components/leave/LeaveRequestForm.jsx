import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

const LeaveRequestForm = ({
    leaveTypes = [],
    initialData = {},
    loading = false,
    onSubmit,
    onCancel
}) => {
    const [formData, setFormData] = useState({
        leaveTypeId: "",
        startDate: "",
        endDate: "",
        reason: "",
        ...initialData
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData({
            leaveTypeId: "",
            startDate: "",
            endDate: "",
            reason: "",
            ...initialData
        });
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: ""
        }));
    };

    const validate = () => {
        const validationErrors = {};

        if (!formData.leaveTypeId) {
            validationErrors.leaveTypeId =
                "Please select a leave type.";
        }

        if (!formData.startDate) {
            validationErrors.startDate =
                "Please select a start date.";
        }

        if (!formData.endDate) {
            validationErrors.endDate =
                "Please select an end date.";
        }

        if (
            formData.startDate &&
            formData.endDate &&
            new Date(formData.endDate) <
                new Date(formData.startDate)
        ) {
            validationErrors.endDate =
                "End date cannot be before the start date.";
        }

        if (!formData.reason?.trim()) {
            validationErrors.reason =
                "Please provide a reason for the leave.";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        if (typeof onSubmit === "function") {
            onSubmit({
                ...formData,
                leaveTypeId: Number(formData.leaveTypeId)
            });
        }
    };

    const leaveTypeOptions = leaveTypes
        .filter((leaveType) => leaveType.active !== false)
        .map((leaveType) => ({
            value: leaveType.id,
            label: leaveType.name
        }));

    return (
        <form
            className="leave-request-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="app-form-section">

                <div className="app-form-section-header">
                    <div>
                        <h5 className="mb-1">
                            Leave Details
                        </h5>

                        <p className="text-muted mb-0">
                            Select the leave type and dates for your
                            leave request.
                        </p>
                    </div>

                    <div className="leave-form-icon">
                        <i className="bi bi-calendar-plus"></i>
                    </div>
                </div>

                <div className="row g-4 mt-1">

                    {/* Leave Type */}
                    <div className="col-12">
                        <Select
                            label="Leave Type"
                            name="leaveTypeId"
                            value={formData.leaveTypeId}
                            onChange={handleChange}
                            options={leaveTypeOptions}
                            placeholder="Select leave type"
                            required
                            disabled={loading}
                            error={errors.leaveTypeId}
                        />
                    </div>

                    {/* Start Date */}
                    <div className="col-md-6">
                        <Input
                            label="Start Date"
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            error={errors.startDate}
                        />
                    </div>

                    {/* End Date */}
                    <div className="col-md-6">
                        <Input
                            label="End Date"
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            error={errors.endDate}
                        />
                    </div>

                    {/* Reason */}
                    <div className="col-12">
                        <label
                            htmlFor="leave-reason"
                            className="form-label"
                        >
                            Reason
                            <span className="text-danger ms-1">
                                *
                            </span>
                        </label>

                        <textarea
                            id="leave-reason"
                            name="reason"
                            className={`form-control ${
                                errors.reason
                                    ? "is-invalid"
                                    : ""
                            }`}
                            rows="5"
                            maxLength="500"
                            value={formData.reason}
                            onChange={handleChange}
                            placeholder="Enter the reason for your leave request..."
                            disabled={loading}
                            required
                        />

                        <div className="d-flex justify-content-between mt-1">
                            <div>
                                {errors.reason && (
                                    <div className="invalid-feedback d-block">
                                        {errors.reason}
                                    </div>
                                )}
                            </div>

                            <small className="text-muted">
                                {formData.reason.length}/500
                            </small>
                        </div>
                    </div>

                </div>
            </div>

            {/* Selected Dates Summary */}
            {formData.startDate &&
                formData.endDate &&
                !errors.startDate &&
                !errors.endDate &&
                new Date(formData.endDate) >=
                    new Date(formData.startDate) && (
                    <div className="leave-request-summary mt-4">

                        <div className="d-flex align-items-center gap-3">

                            <div className="summary-icon">
                                <i className="bi bi-calendar-check"></i>
                            </div>

                            <div>
                                <small className="text-muted d-block">
                                    Requested period
                                </small>

                                <span className="fw-semibold">
                                    {formatDisplayDate(
                                        formData.startDate
                                    )}{" "}
                                    →{" "}
                                    {formatDisplayDate(
                                        formData.endDate
                                    )}
                                </span>
                            </div>

                        </div>

                    </div>
                )}

            {/* Form Actions */}
            <div className="leave-form-actions mt-4">

                {onCancel && (
                    <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    disabled={loading}
                >
                    <i className="bi bi-send me-2"></i>
                    Submit Leave Request
                </Button>

            </div>
        </form>
    );
};

const formatDisplayDate = (date) => {
    if (!date) {
        return "";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
};

export default LeaveRequestForm;