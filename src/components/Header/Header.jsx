import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from '../../common/Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const isAuthPage = location.pathname === '/login' || location.pathname === '/registration';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  if (isAuthPage) return null;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>MyApp</div>
      {token && (
        <div className={styles.userBlock}>
          <span className={styles.username}>{userName}</span>
          <Button text="Logout" onClick={handleLogout} />
        </div>
      )}
    </header>
  );
};

export default Header;

