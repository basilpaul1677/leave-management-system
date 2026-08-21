import { useEffect, useState } from "react";

import ProfileCard from "../../components/profile/ProfileCard";
import PageLoader from "../../components/common/PageLoader";
import ErrorState from "../../components/common/ErrorState";

import employeeService from "../../services/employeeService";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
    const { user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadProfile = async () => {
        if (!user?.id) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response =
                await employeeService.getEmployeeById(user.id);

            setProfile(response?.data ?? response);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Unable to load your profile."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, [user?.id]);

    const handleProfileUpdated = (updatedProfile) => {
        setProfile(updatedProfile);
    };

    if (loading) {
        return <PageLoader />;
    }

    if (error) {
        return (
            <ErrorState
                title="Unable to load profile"
                message={error}
                onRetry={loadProfile}
            />
        );
    }

    return (
        <div className="page-container">

            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        My Profile
                    </h1>

                    <p className="page-subtitle">
                        View and manage your employee profile.
                    </p>
                </div>
            </div>

            <div className="content-card">
                {profile && (
                    <ProfileCard
                        profile={profile}
                        onProfileUpdated={handleProfileUpdated}
                    />
                )}
            </div>

        </div>
    );
};

export default Profile;
