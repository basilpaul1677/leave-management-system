import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

function Login() {
    const {
        login,
        isAuthenticated,
    } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError('');

        if (!formData.email.trim()) {
            setError('Please enter your email address.');
            return;
        }

        if (!formData.password) {
            setError('Please enter your password.');
            return;
        }

        try {
            setSubmitting(true);

            await login({
                email: formData.email.trim(),
                password: formData.password,
            });

            const destination =
                location.state?.from?.pathname ||
                '/dashboard';

            navigate(destination, {
                replace: true,
            });
        } catch (loginError) {
            console.error(
                'Login failed:',
                loginError
            );

            const status =
                loginError.response?.status;

            if (status === 401) {
                setError(
                    'Invalid email or password.'
                );
            } else if (status === 403) {
                setError(
                    'You do not have permission to access this application.'
                );
            } else if (
                loginError.response?.data?.message
            ) {
                setError(
                    loginError.response.data.message
                );
            } else {
                setError(
                    'Unable to connect to the server. Please try again.'
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-background-decoration auth-decoration-one" />
            <div className="auth-background-decoration auth-decoration-two" />

            <div className="container">
                <div className="row min-vh-100 align-items-center justify-content-center py-5">
                    <div className="col-12 col-md-8 col-lg-5 col-xl-4">
                        <div className="auth-card">

                            <div className="text-center mb-4">
                                <div className="auth-logo">
                                    <i className="bi bi-calendar2-check-fill"></i>
                                </div>

                                <h1 className="auth-title">
                                    Welcome back
                                </h1>

                                <p className="auth-subtitle">
                                    Sign in to your Leave Management Portal
                                </p>
                            </div>

                            {error && (
                                <div
                                    className="alert alert-danger auth-alert"
                                    role="alert"
                                >
                                    <i className="bi bi-exclamation-circle-fill me-2"></i>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate>

                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label auth-label"
                                    >
                                        Email address
                                    </label>

                                    <div className="input-group auth-input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-envelope"></i>
                                        </span>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                            disabled={submitting}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="form-label auth-label"
                                    >
                                        Password
                                    </label>

                                    <div className="input-group auth-input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock"></i>
                                        </span>

                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="current-password"
                                            disabled={submitting}
                                        />

                                        <button
                                            type="button"
                                            className="btn auth-password-toggle"
                                            onClick={() =>
                                                setShowPassword(
                                                    (previous) =>
                                                        !previous
                                                )
                                            }
                                            aria-label={
                                                showPassword
                                                    ? 'Hide password'
                                                    : 'Show password'
                                            }
                                            disabled={submitting}
                                        >
                                            <i
                                                className={
                                                    showPassword
                                                        ? 'bi bi-eye-slash'
                                                        : 'bi bi-eye'
                                                }
                                            ></i>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 auth-submit-button"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                aria-hidden="true"
                                            ></span>

                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-box-arrow-in-right me-2"></i>
                                            Sign in
                                        </>
                                    )}
                                </button>

                            </form>

                            <div className="auth-footer">
                                <i className="bi bi-shield-check me-1"></i>
                                Secure employee access
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;