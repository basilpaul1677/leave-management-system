import { Link } from "react-router-dom";

const ServerError = () => {
    return (
        <div className="error-page">
            <div className="error-content">

                <div className="error-code">
                    500
                </div>

                <h1 className="error-title">
                    Something Went Wrong
                </h1>

                <p className="error-message">
                    An unexpected server error occurred.
                    Please try again later.
                </p>

                <Link
                    to="/dashboard"
                    className="btn btn-primary"
                >
                    Back to Dashboard
                </Link>

            </div>
        </div>
    );
};

export default ServerError;
