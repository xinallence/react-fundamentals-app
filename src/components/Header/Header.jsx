import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./components";
import { Button } from "../../common";

import styles from "./styles.module.css";

export const Header = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = ["/login", "/registration"].includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.headerContainer}>
      <Logo />
      {token && !isAuthPage && (
        <div className={styles.userContainer}>
          <p className={styles.userName}>User</p>
          <Button
            buttonText="LOGOUT"
            handleClick={handleLogout}
            data-testid="logoutButton"
          />
        </div>
      )}
    </div>
  );
};
