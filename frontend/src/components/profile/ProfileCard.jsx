import React from "react";
import { Mail, Building2, ShieldCheck, Pencil } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";
import RoleBadge from "../common/RoleBadge";

const ProfileCard = ({
    employee,
    onEdit,
}) => {
    if (!employee) {
        return (
            <div className="profile-card profile-card-empty">
                <p>
                    Profile information is not available.
                </p>
            </div>
        );
    }

    const fullName = [
        employee.firstName,
        employee.lastName,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="profile-card">

            {/* Profile Header */}
            <div className="profile-card-header">

                <ProfileAvatar
                    firstName={employee.firstName}
                    lastName={employee.lastName}
                    size="large"
                />

                <div className="profile-card-identity">
                    <h3>
                        {fullName || "Employee"}
                    </h3>

                    <p className="profile-card-code">
                        {employee.employeeCode || "N/A"}
                    </p>

                    {employee.role && (
                        <RoleBadge role={employee.role} />
                    )}
                </div>

                {onEdit && (
                    <button
                        type="button"
                        className="profile-edit-button"
                        onClick={onEdit}
                    >
                        <Pencil size={16} />
                        <span>Edit Profile</span>
                    </button>
                )}
            </div>

            {/* Profile Summary */}
            <div className="profile-card-summary">

                <div className="profile-summary-item">
                    <Mail size={17} />

                    <div>
                        <span>Email</span>
                        <strong>
                            {employee.email || "N/A"}
                        </strong>
                    </div>
                </div>

                <div className="profile-summary-item">
                    <Building2 size={17} />

                    <div>
                        <span>Department</span>
                        <strong>
                            {employee.department || "N/A"}
                        </strong>
                    </div>
                </div>

                <div className="profile-summary-item">
                    <ShieldCheck size={17} />

                    <div>
                        <span>Status</span>
                        <strong
                            className={
                                employee.active
                                    ? "profile-active-text"
                                    : "profile-inactive-text"
                            }
                        >
                            {employee.active
                                ? "Active"
                                : "Inactive"}
                        </strong>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileCard;