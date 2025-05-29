// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * finish markup according to the figma https://www.figma.com/design/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?node-id=2927-216&t=OXbHXwMixWTtxRSw-1
// * add validation for fields: all fields are required. Show validation message. https://www.figma.com/design/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?node-id=2932-191&t=OXbHXwMixWTtxRSw-1
// * render this component by route '/login'
// * use login service to submit form data and make POST API request '/login'.
// * component should have a link to the Registration page (see design)
// * save token from API after success login to localStorage.
// ** PAY ATTENTION ** token should be saved to localStorage inside login handler function after login service response
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#login-new-component

// Module 3.
// * use 'setUserData' from 'userSlice.js' to save user's name, token and email to the store after success login.
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-3/home-task/components#login-component

// Module 4.
// * use 'setUserData' from 'userSlice.js' to add user's data to store. (DO NOT use 'user/me' [GET] request)

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services";
import { setUserData } from "../../store/slices/userSlice";
import styles from "./styles.module.css";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";

export const Login = () => {
  const dispatch = useDispatch();
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
      const response = await login(formData);

      if (response.successful) {
        const { name, email } = response.user;
        localStorage.setItem("token", response.result);
        dispatch(setUserData({ name, email, token: response.result }));
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
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
