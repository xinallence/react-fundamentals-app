// Module 1.
// You don't need this component for Module 1.

// Module 2.
// * Uncomment component code with imports
// * Use this component for author creation functionality
// * Pass callback 'onCreateAuthor' from CourseForm.jsx to return author's info {id: string, name: string}

// Module 3.
// Remove 'onCreateAuthor' from props => use 'dispatch' and 'saveAuthor' from 'authorsSlice.js' to save new author to the store

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Input } from "../../../../common/Input/Input";
import { Button } from "../../../../common/Button/Button";
import { useDispatch } from "react-redux";
import { saveAuthor } from "../../../../store/slices/authorsSlice";

export const CreateAuthor = () => {
  const [authorName, setAuthorName] = useState("");
  const dispatch = useDispatch();

  const handleCreate = () => {
    if (authorName.trim().length < 2) {
      alert("Author name must be at least 2 characters");
      return;
    }

    const newAuthor = {
      name: authorName,
    };

    dispatch(saveAuthor(newAuthor));
    setAuthorName("");
  };

  return (
    <div className={styles.createAuthor}>
      <Input
        labelText="Author Name"
        name="authorName"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholderText="Enter author name"
        data-testid="createAuthorInput"
      />
      <Button
        buttonText="Create Author"
        handleClick={handleCreate}
        data-testid="createAuthorButton"
      />
    </div>
  );
};
