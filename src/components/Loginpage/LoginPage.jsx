import "./LoginPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApi } from "../../api/useApi";
import { CommonApi } from "../../api/apiService";
import { Eye, EyeOff, Lock, Mail } from "lucide-react"; // Using lucide-react for professional icons

const Loginpage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { request: login, loading: isProcessing, error: apiError } = useApi(CommonApi.login);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validation()) return;

    try {
      const res = await login({ email, password });

      const { token, role, profile } = res || {};

      if (!token || !role) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("profile", JSON.stringify(profile));

      toast.success("Login Success");

      // role-based redirect
      const roleRedirectMap = {
        personalAssistant: "/pa",
        doctor: "/dr",
      };

      navigate(roleRedirectMap[role] || "/login", { replace: true });

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        err.message ||
        "Authentication failed"
      );
    }
  };

  const validation = () => {
    if (!email.includes("@")) {
      toast.warning("Please enter a valid professional email");
      return false;
    }
    if (password.length < 4) {
      toast.warning("Password security check failed");
      return false;
    }
    return true;
  };

  return (
    <div className="healthcare-login-container">
      <div className="login-card">
        <div className="brand-section">
          <div className="medical-logo"></div>
          <h2>Dr.Parcha</h2>
          <p>Secure Access</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="dr.smith@hospital.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="login-submit-btn" disabled={isProcessing}>
            {isProcessing ? <div className="spinner"></div> : "Sign In to Dashboard"}
          </button>
        </form>

        {/* <div className="login-footer">
          <p>Don't have an account? <a href="/signup">sign up</a></p>
          <p className="security-note">🔒 End-to-end encrypted HIPAA compliant portal</p>
        </div> */}
      </div>
    </div>
  );
};

export default Loginpage;