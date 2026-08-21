import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="error-page">
            <div className="error-content">

                <div className="error-code">
                    404
                </div>

                <h1 className="error-title">
                    Page Not Found
                </h1>

                <p className="error-message">
                    The page you are looking for does not exist
                    or may have been moved.
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

export default NotFound;