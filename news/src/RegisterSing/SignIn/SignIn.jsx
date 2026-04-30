import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import "./SignIn.css";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // Yahan aap apna login logic add kar sakte hain
    alert("Login Successful!");
    navigate("/"); // Login ke baad home par bhej dega
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        {/* Back Button */}
        <Link to="/" className="back-home">
          <FaArrowLeft /> Back to Home
        </Link>

        <div className="signin-header">
          <h2>Welcome Back</h2>
          <p>Login to stay updated with the latest news.</p>
        </div>

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                onChange={handleChange}
              />
              <div 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div className="signin-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="signin-btn">Sign In</button>
        </form>

        <div className="signin-footer">
          <p>Don't have an account? <Link to="/register">Register Now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;