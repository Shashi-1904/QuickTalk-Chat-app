import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [pic, setPic] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        if (!name || !email || !password || !confirmPassword || !pic) {
            toast.error("Please fill all fields and upload an image.");
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            // 1. Upload Image
            const formData = new FormData();
            formData.append("image", pic);

            const imageResponse = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData
            });

            const imageData = await imageResponse.json();

            if (!imageResponse.ok) {
                toast.error("Failed to upload image");
                setLoading(false);
                return;
            }

            const imageUrl = imageData.imageUrl;

            // 2. Submit Signup Data with Image URL
            const signupResponse = await fetch("http://localhost:5000/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, imageUrl })
            });

            const signupData = await signupResponse.json();

            if (signupResponse.ok) {
                toast.success("Signup successful!");
                // console.log("User Data:", signupData);
                localStorage.setItem("userInfo", signupData)

                // ✅ Reset Form Fields after successful submission
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setPic(null);

            } else {
                toast.error(signupData.message || "Signup failed");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred during signup");
        } finally {
            setLoading(false);
        }
    };

    const postDetails = (file) => {
        if (file) {
            setPic(file);
            // toast.info(`Selected image: ${file.name}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <div className="mb-3 position-relative">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            {/* Image Upload Field */}
            <div className="mb-3">
                <label className="form-label">Upload your Picture</label>
                <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
            >
                {loading ? "Signing Up..." : "Sign Up"}
            </button>
        </form>
    );
}

export default Signup;
