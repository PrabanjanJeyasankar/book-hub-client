import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import "./UserFormComponent.css";

const UserFormComponent = ({
  title,
  buttonText,
  onSubmit,
  isAdminPanel,
  initialRole = "user",
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name) newErrors.name = "* Name is required";
    if (!email) newErrors.email = "* Email is required";
    if (!password) newErrors.password = "* Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ name, email, password, role });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="add-user-container">
      <div className="add-user-content">
        <h2 className="add-user-title">{title}</h2>
        <form onSubmit={handleSubmit} className="add-user-form">
          <div className="add-user-form-content">
            <div className="add-user-input-container">
              <div className="add-user-name-input">
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="add-user-name-field"
                />
              </div>
              <div className="add-user-name-error-container">
                {errors.name && (
                  <span className="add-user-name-error">{errors.name}</span>
                )}
              </div>
            </div>
            <div className="add-user-input-container">
              <div className="add-user-email-input">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="add-user-email-field"
                />
              </div>
              <div className="add-user-email-error-container">
                {errors.email && (
                  <span className="add-user-email-error">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="add-user-input-container">
              <div className="add-user-password-input">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="add-user-password-field"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="add-user-password-toggle-btn"
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={1.5} />
                  ) : (
                    <Eye size={18} strokeWidth={1.5} />
                  )}
                </button>
              </div>
              <div className="add-user-password-error-container">
                {errors.password && (
                  <span className="add-user-password-error">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>
            {isAdminPanel && (
              <div className="add-user-input-container">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="add-user-role-dropdown"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}
            <div>
              <button className="add-user-submit-btn" type="submit">
                {buttonText}
              </button>
            </div>
            {!isAdminPanel && (
              <div className="signup-page-existing-user">
                <span>Existing User?</span>
                <Link className="signup-button" to="/login">
                  Log In
                </Link>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormComponent;
