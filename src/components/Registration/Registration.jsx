// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * finish markup according to the figma https://www.figma.com/design/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?node-id=2932-219&t=OXbHXwMixWTtxRSw-1
// * add validation for fields: all fields are required. Show validation message. https://www.figma.com/design/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?node-id=2932-257&t=OXbHXwMixWTtxRSw-1
// * render this component by route '/registration'
// * submit form data and make POST API request '/registration'.
// * after successful registration navigates to '/login' route.
// * component should have a link to the Login page (see design)
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#registration-new-component

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { createUser } from "../../services";

import styles from "./styles.module.css";

export const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createUser({ name, email, password });
      navigate("/login");
    } catch (error) {
      alert(error.message || "Registration failed");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Registration</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Input
            labelText="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

          <Input
            labelText="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <Input
            labelText="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <Button buttonText="Register" type="submit" />
        </form>

        <p>
          If you have an account you may&nbsp;
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
