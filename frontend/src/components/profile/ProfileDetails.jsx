import React from "react";
import {
    Mail,
    Building2,
    CalendarDays,
    ShieldCheck,
    UserRound,
    Hash,
    UserCheck,
} from "lucide-react";

const ProfileDetails = ({ employee }) => {
    if (!employee) {
        return (
            <div className="profile-details-empty">
                <UserRound size={32} />

                <p>
                    Employee information is not available.
                </p>
            </div>
        );
    }

    const formatDate = (date) => {
        if (!date) {
            return "Not available";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const getFullName = () => {
        return [employee.firstName, employee.lastName]
            .filter(Boolean)
            .join(" ");
    };

    return (
        <div className="profile-details">
            <div className="profile-details-grid">

                {/* Employee Code */}
                <div className="profile-detail-item">
                    <div className="profile-detail-icon">
                        <Hash size={18} />
                    </div>

                    <div className="profile-detail-content">
                        <span className="profile-detail-label">
                            Employee Code
                        </span>

                        <span className="profile-detail-value">
                            {employee.employeeCode || "Not available"}
                        </span>
                    </div>
                </div>

                {/* Full Name */}
                <div className="profile-detail-item">
                    <div className="profile-detail-icon">
                        <UserRound size={18} />
                    </div>

                    <div className="profile-detail-content">
                        <span className="profile-detail-label">
                            Full Name
                        </span>

                        <span className="profile-detail-value">
                            {getFullName() || "Not available"}
                        </span>
                    </div>
                </div>

                {/* Email */}
                <div className="profile-detail-item">
                    <div className="profile-detail-icon">
                        <Mail size={18} />
                    </div>

                    <div className="profile-detail-content">
                        <span className="profile-detail-label">
                            Email Address
                        </span>

                        <span className="profile-detail-value">
                            {employee.email || "Not available"}
                        </span>
                    </div>
                </div>

                {/* Department */}
                <div className="profile-detail-item">
                    <div className="profile-detail-icon">
                        <Building2 size={18} />
                    </div>

                    <div className="profile-detail-content">
                        <span className="profile-detail-label">
                            Department
                        </span>

                        <span className="profile-detail-value">
                            {employee.department || "Not available"}
                        </span>
                    </div>
                </div>

                {/* Role */}
                <div className="profile-detail-item">
                    <div className="profile-detail-icon">
                        <ShieldCheck size={18} />
                    </div>

                    <div className="profile-detail-content">
                        <span className="profile-detail-label">
                            Role
                        </span>

                        <span className="profile-detail-value profile-role-value">
                            {employee.role || "Not available"}
                        </span>
                    </div>
                </div>

                {/* Joining Date */}
                <div className="profile-detail-item">
                    <div className="profile-detail-icon">
                        <CalendarDays size={18} />
                    </div>

                    <div className="profile-detail-content">
                        <span className="profile-detail-label">
                            Joining Date
                        </span>

                        <span className="profile-detail-value">
                            {formatDate(employee.joiningDate)}
                        </span>
                    </div>
                </div>

                {/* Manager */}
                <div className="profile-detail-item">
                    <div className="profile-detail-icon">
                        <UserCheck size={18} />
                    </div>

                    <div className="profile-detail-content">
                        <span className="profile-detail-label">
                            Manager ID
                        </span>

                        <span className="profile-detail-value">
                            {employee.managerId ?? "Not assigned"}
                        </span>
                    </div>
                </div>

                {/* Account Status */}
                <div className="profile-detail-item">
                    <div className="profile-detail-icon">
                        <ShieldCheck size={18} />
                    </div>

                    <div className="profile-detail-content">
                        <span className="profile-detail-label">
                            Account Status
                        </span>

                        <span
                            className={`profile-status ${
                                employee.active
                                    ? "profile-status-active"
                                    : "profile-status-inactive"
                            }`}
                        >
                            {employee.active
                                ? "Active"
                                : "Inactive"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;