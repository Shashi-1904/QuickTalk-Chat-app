import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Login successful!");
                console.log("User data:", data);

                // ✅ Clear input fields after successful login
                setEmail("");
                setPassword("");

                // ✅ Redirect to home page or dashboard
                // navigate("/dashboard");

            } else {
                toast.error(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    const handleGuestLogin = () => {
        // Autofill guest credentials
        setEmail("guest@example.com");
        setPassword("123456");
        toast.info("Guest credentials applied.");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3 position-relative">
                <label className="form-label">Password</label>
                <div className="input-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="btn btn-primary w-100 mb-2"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            {/* Guest User Credentials Button */}
            <div className="w-100">
                <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={handleGuestLogin}
                >
                    Get Guest User Credentials
                </button>
            </div>
        </form>
    );
}

export default Login;
