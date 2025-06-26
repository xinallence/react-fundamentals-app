import React from 'react';
import Button from '../../../../common/Button';
import styles from './styles.module.css';

const AuthorItem = ({ author, onButtonClick, buttonLabel }) => {
  return (
    <div className={styles.authorItem}>
      <span>{author.name}</span>
      <Button text={buttonLabel} onClick={onButtonClick} />
    </div>
  );
};

export default AuthorItem;
