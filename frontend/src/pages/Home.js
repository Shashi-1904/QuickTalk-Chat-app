import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/Login";
import Signup from "../components/Signup";

function Home() {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="mb-4 text-primary fw-bold">QuickTalk</h1>
            <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "10px" }}>
                <ul className="nav nav-pills nav-fill mb-3">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                            onClick={() => setActiveTab("login")}
                        >
                            Login
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "signup" ? "active" : ""}`}
                            onClick={() => setActiveTab("signup")}
                        >
                            Sign Up
                        </button>
                    </li>
                </ul>
                {activeTab === "login" ? <Login /> : <Signup />}
            </div>
        </div>
    );
}

export default Home;
