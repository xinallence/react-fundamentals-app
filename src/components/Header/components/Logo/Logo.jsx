import React from "react";

import styles from "./styles.module.css";

import LogoImage from "../../../../assets/logo.svg";

// Module 1:
// * add logo.svg as a logo image
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#logo-component

export const Logo = () => (
  <img className={styles.logo} scr={LogoImage} alt="logo" />
);
