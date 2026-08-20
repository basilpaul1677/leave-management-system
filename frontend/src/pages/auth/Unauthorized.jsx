import { Link } from 'react-router-dom';

function Unauthorized() {
    return (
        <div className="error-page">
            <div className="error-card">

                <div className="error-icon error-icon-danger">
                    <i className="bi bi-shield-lock-fill"></i>
                </div>

                <p className="error-code">
                    403
                </p>

                <h1 className="error-title">
                    Access denied
                </h1>

                <p className="error-message">
                    You don't have permission to access this page.
                </p>

                <Link
                    to="/dashboard"
                    className="btn btn-primary"
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Dashboard
                </Link>

            </div>
        </div>
    );
}

export default Unauthorized;