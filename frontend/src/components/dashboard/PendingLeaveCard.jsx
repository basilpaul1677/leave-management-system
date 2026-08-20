import React from "react";
import { useNavigate } from "react-router-dom";

const PendingLeaveCard = ({ leave }) => {
    const navigate = useNavigate();

    if (!leave) {
        return null;
    }

    return (
        <div className="pending-leave-card">
            <div className="pending-leave-main">
                <div className="pending-leave-icon">
                    🕐
                </div>

                <div className="pending-leave-info">
                    <h3>
                        {leave.leaveTypeName || "Leave Request"}
                    </h3>

                    <p>
                        {leave.startDate} → {leave.endDate}
                    </p>
                </div>
            </div>

            <div className="pending-leave-action">
                <button
                    type="button"
                    onClick={() =>
                        navigate(`/leaves/${leave.id}`)
                    }
                >
                    View
                </button>
            </div>
        </div>
    );
};

export default PendingLeaveCard;