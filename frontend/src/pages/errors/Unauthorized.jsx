import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div className="error-page">
            <div className="error-content">

                <div className="error-code">
                    403
                </div>

                <h1 className="error-title">
                    Access Denied
                </h1>

                <p className="error-message">
                    You do not have permission to access this page.
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

export default Unauthorized;
