import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../common/Input';
import Button from '../../common/Button';
import styles from './styles.module.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({ email: '', password: '' });
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

      if (!response.ok) {
        setApiError(result?.errors?.[0]?.msg || 'Login failed');
        return;
      }

      localStorage.setItem('token', result.result);
      navigate('/courses');
    } catch (error) {
      setApiError(error.message);
    }
  };
  
  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          labelText="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}

        <Input
          labelText="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <div className={styles.error}>{errors.password}</div>
        )}

        {apiError && <div className={styles.error}>{apiError}</div>}

        <Button text="Login" />
      </form>
      <div className={styles.link}>
        Don't have an account? <Link to="/registration">Register</Link>
      </div>
    </div>
  );
};

export default Login;

