// Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// Module 2.
// * uncomment this component (ctrl + a => ctrl + /)
// * add functionality to create new course with:
//   ** title
//   ** description
//   ** duration (user enters in minutes, you should map in format «hh:mm»)
//   ** existing authors (use 'authorsList' prop)
//   ** new created author (create field and button, update 'authorsList')
//   ** user should be able to remove author from the course
//   ** add validation to the fields
//   ** add new course to the 'coursesList' and navigate to the '/courses' page => new course should be in the courses list
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#add-new-course

// Module 3.
// * remove props - authorsList, createCourse, createAuthor
// * use selector from store/selectors.js to get authorsList from store
// * save new course to the store. Use action 'saveCourse' from 'src/store/slices/coursesSlice'
// * save new author to the store. Use action 'saveAuthor' from 'src/store/slices/authorsSlice'
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-3/home-task/components#add-new-course

// Module 4.
// * render this component only for ADMIN user
// * in this module you should separate functionality for this component:
//   ** create mode:
//     * form for the course creation should be opened by 'courses/add' route by 'ADD NEW COURSE' button click (as before)
//     * make a request to save new course
//     * use 'createCourse' service from 'src/services.js' and 'createCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
//     * use 'createAuthor ' service from 'src/services.js' and 'createAuthorThunk' thunk from 'src/store/thinks/authorsThunk.js'
//     * save new course to the store after success response
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-4/home-task/components#add-new-course
//   ** update mode:
//     * form should be opened by route '/courses/update/:courseId' route by 'update' button click
//     * appropriate forms field should be prefilled with course's info
//     * user should have ability to modify course information in the fields and change authors list
//     * make a request to save updated course
//     * use 'updateCourseService' from 'src/services.js' and 'updateCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
//     save updated course to the store after success response.
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-4/home-task/components#update-course

// Module 5:
// * proposed cases for unit tests:
//   ** CourseForm should show authors lists (all and course authors).
//   **  CourseForm 'Create author' button click should call dispatch.
//   **  CourseForm 'Add author' button click should add an author to the course authors list.
//   **  CourseForm 'Delete author' button click should delete an author from the course list.

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Input, Button } from "../../common";
import { getCourseDuration } from "../../helpers";
import { AuthorItem } from "./components/AuthorItem/AuthorItem";
import { CreateAuthor } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorsSelector } from "../../store/selectors";
import { saveCourse } from "../../store/slices/coursesSlice";

export const CourseForm = () => {
  const dispatch = useDispatch();
  const authorsList = useSelector(getAuthorsSelector);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [availableAuthors, setAvailableAuthors] = useState([]);
  const [courseAuthors, setCourseAuthors] = useState([]);

  useEffect(() => {
    setAvailableAuthors(authorsList);
  }, [authorsList]);

  const handleCreateCourse = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 2 ||
      description.trim().length < 2 ||
      Number(duration) <= 0 ||
      courseAuthors.length === 0
    ) {
      alert("All fields must be valid and filled in.");
      return;
    }

    const newCourse = {
      title,
      description,
      duration: Number(duration),
      authors: courseAuthors.map((a) => a.id),
    };

    dispatch(saveCourse(newCourse));

    setTitle("");
    setDescription("");
    setDuration("");
    setCourseAuthors([]);
    setAvailableAuthors(authorsList);
  };

  const addAuthorToCourse = (author) => {
    setAvailableAuthors(availableAuthors.filter((a) => a.id !== author.id));
    setCourseAuthors([...courseAuthors, author]);
  };

  const removeAuthorFromCourse = (author) => {
    setCourseAuthors(courseAuthors.filter((a) => a.id !== author.id));
    setAvailableAuthors([...availableAuthors, author]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Course Edit/Create Page</h2>
      <form
        onSubmit={handleCreateCourse}
        data-testid="courseForm"
        className={styles.form}
      >
        <Input
          labelText="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholderText="Enter course title"
          data-testid="titleInput"
        />

        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-testid="descriptionTextArea"
        />

        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            <Input
              labelText="Duration"
              name="duration"
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholderText="Enter duration in minutes"
              data-testid="durationInput"
            />
            <div className={styles.durationOutput}>
              {getCourseDuration(Number(duration))} hours
            </div>

            <h3>Authors</h3>
            <CreateAuthor />

            <h4 className={styles.subTitle}>Authors List</h4>
            {availableAuthors.map((author) => (
              <AuthorItem
                key={author.id}
                name={author.name}
                buttonText="Add author"
                onClick={() => addAuthorToCourse(author)}
                testId="addAuthor"
              />
            ))}
          </div>

          <div className={styles.rightColumn}>
            <h3>Course Authors</h3>
            {courseAuthors.length > 0 ? (
              courseAuthors.map((author) => (
                <AuthorItem
                  key={author.id}
                  name={author.name}
                  buttonText="Delete author"
                  onClick={() => removeAuthorFromCourse(author)}
                  testId="deleteAuthor"
                  isRemovable
                />
              ))
            ) : (
              <p className={styles.notification}>Author list is empty</p>
            )}
          </div>
        </div>

        <div className={styles.buttonsContainer}>
          <Button
            buttonText="Cancel"
            handleClick={() => window.history.back()}
            data-testid="cancelButton"
          />
          <Button
            type="submit"
            buttonText="Create Course"
            data-testid="createCourseButton"
          />
        </div>
      </form>
    </div>
  );
};
