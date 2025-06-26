import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../common/Input';
import Button from '../../common/Button';
import styles from './styles.module.css';

const Registration = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
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
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

      if (!response.ok) {
        setApiError(result?.errors?.[0]?.msg || 'Registration failed');
        return;
      }

      navigate('/login');
    } catch (error) {
      setApiError(error.message);
    }
  };
  
  return (
    <div className={styles.registration}>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <Input
          labelText="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div className={styles.error}>{errors.name}</div>}

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

        <Button text="Registration" />
      </form>
      <div className={styles.link}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Registration;

