import React from "react";

const LeaveStatusTimeline = ({
    status,
    createdAt,
    processedAt,
}) => {
    const normalizedStatus =
        status?.toUpperCase() || "PENDING";

    const isApproved =
        normalizedStatus === "APPROVED";

    const isRejected =
        normalizedStatus === "REJECTED";

    const formatDateTime = (value) => {
        if (!value) {
            return null;
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return date.toLocaleString();
    };

    return (
        <div className="leave-status-timeline">
            <div className="timeline-item completed">
                <div className="timeline-marker">
                    <span />
                </div>

                <div className="timeline-content">
                    <h4>Leave Requested</h4>

                    <p>
                        Leave request has been submitted.
                    </p>

                    {createdAt && (
                        <span className="timeline-date">
                            {formatDateTime(createdAt)}
                        </span>
                    )}
                </div>
            </div>

            <div
                className={`timeline-item ${
                    isApproved || isRejected
                        ? "completed"
                        : "current"
                }`}
            >
                <div className="timeline-marker">
                    <span />
                </div>

                <div className="timeline-content">
                    <h4>Manager Review</h4>

                    <p>
                        {normalizedStatus === "PENDING"
                            ? "Request is waiting for manager review."
                            : isApproved
                            ? "Request has been approved."
                            : isRejected
                            ? "Request has been rejected."
                            : "Request is being processed."}
                    </p>

                    {processedAt && (
                        <span className="timeline-date">
                            {formatDateTime(processedAt)}
                        </span>
                    )}
                </div>
            </div>

            {isApproved && (
                <div className="timeline-item completed">
                    <div className="timeline-marker">
                        <span />
                    </div>

                    <div className="timeline-content">
                        <h4>Approved</h4>

                        <p>
                            Your leave request has been
                            approved successfully.
                        </p>
                    </div>
                </div>
            )}

            {isRejected && (
                <div className="timeline-item rejected">
                    <div className="timeline-marker">
                        <span />
                    </div>

                    <div className="timeline-content">
                        <h4>Rejected</h4>

                        <p>
                            Your leave request has been
                            rejected.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaveStatusTimeline;