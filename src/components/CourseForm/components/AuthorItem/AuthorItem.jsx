import React from "react";
import { Button } from "../../../../common/Button/Button";
import styles from "./styles.module.css";

export const AuthorItem = ({
  name,
  buttonText,
  onClick,
  testId = "authorItem",
}) => (
  <div className={styles.authorItem} data-testid={testId}>
    <span>{name}</span>
    <Button
      buttonText={buttonText}
      onClick={onClick}
      data-testid={`${testId}-button`}
    />
  </div>
);
