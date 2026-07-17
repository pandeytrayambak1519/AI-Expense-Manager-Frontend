import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { toast, ToastContainer } from "react-toastify";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(form);

            // Backend returns { token: "jwt_token" }
            const token = response.data.token;

            // Save JWT
            localStorage.setItem("token", token);

            toast.success("Login Successful");

            setTimeout(() => {
                navigate("/dashboard");
            }, 800);

        } catch (error) {

            console.error(error);

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Invalid Email or Password";

            toast.error(message);
        }
    };

    return (
        <div className="auth-page">

            <ToastContainer position="top-right" autoClose={3000} />

            <div className="auth-card shadow-lg">

                <div className="auth-illustration">

                    <div>

                        <h2>Welcome back</h2>

                        <p>
                            Track your expenses, stay on budget,
                            and grow your savings with confidence.
                        </p>

                        <div className="auth-stats">

                            <div>
                                <strong>95%</strong>
                                <span>Budget accuracy</span>
                            </div>

                            <div>
                                <strong>24/7</strong>
                                <span>Insights at hand</span>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="auth-form">

                    <h3 className="fw-bold mb-3">
                        Sign In
                    </h3>

                    <p className="text-muted mb-4">
                        Access your financial dashboard in seconds.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">

                            <label className="form-label">
                                Email
                            </label>

                            <div className="auth-input-group">

                                <span className="auth-input-icon">
                                    ✉️
                                </span>

                                <input
                                    type="email"
                                    className="form-control auth-input"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />

                            </div>

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Password
                            </label>

                            <div className="auth-input-group">

                                <span className="auth-input-icon">
                                    🔒
                                </span>

                                <input
                                    type="password"
                                    className="form-control auth-input"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-3 fw-semibold auth-button"
                        >
                            Login
                        </button>

                    </form>

                    <p className="text-center mt-4 mb-0 auth-footer-text">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="auth-link"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;