import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { login } from "../../services";

export const Login = ({ setToken, setUserName }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const data = await login(formData);

      localStorage.setItem("token", data.result);
      localStorage.setItem("userName", data.user.name);
      setToken(data.result);
      setUserName(data.user.name);
      navigate("/courses");
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} data-testid="loginForm">
          <Input
            labelText="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            data-testid="emailInput"
          />
          {errors.email && (
            <div className={styles.error} data-testid="emailError">
              {errors.email}
            </div>
          )}

          <Input
            labelText="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            data-testid="passwordInput"
          />
          {errors.password && (
            <div className={styles.error} data-testid="passwordError">
              {errors.password}
            </div>
          )}

          <Button buttonText="Login" type="submit" data-testid="loginButton" />
        </form>

        <p>
          <span>If you don't have an account you </span>
          <Link to="/registration" data-testid="registrationLink">
            Registration
          </Link>
        </p>
      </div>
    </div>
  );
};
