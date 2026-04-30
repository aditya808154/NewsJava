import React, { useState } from "react";
import "./Register.css";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    alert("Account Created Successfully!");
  };

  return (
    <div className="register-container">
      <div className="register-card shadow">
        <div className="register-left">
          <h1>Day Night News</h1>
          <p>Join our community to stay ahead. Create an account for personalized news alerts and exclusive daily updates.</p>
          <div className="red-line"></div>
        </div>

        <div className="register-right">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Create Account</h2>

            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" className="register-btn">
              REGISTER NOW
            </button>

            <p className="login-link">
              Already have an account? <span className="red-text"><a href="/SignIn"> Sign_in</a></span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;