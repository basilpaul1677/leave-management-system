import React from "react";
import { User } from "lucide-react";

const ProfileAvatar = ({
    firstName,
    lastName,
    size = "large",
    imageUrl,
}) => {
    const getInitials = () => {
        const firstInitial = firstName?.charAt(0) || "";
        const lastInitial = lastName?.charAt(0) || "";

        return `${firstInitial}${lastInitial}`.toUpperCase() || "U";
    };

    return (
        <div className={`profile-avatar profile-avatar-${size}`}>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={`${firstName || ""} ${lastName || ""}`}
                    className="profile-avatar-image"
                />
            ) : firstName || lastName ? (
                <span className="profile-avatar-initials">
                    {getInitials()}
                </span>
            ) : (
                <User size={size === "small" ? 18 : 30} />
            )}
        </div>
    );
};

export default ProfileAvatar;