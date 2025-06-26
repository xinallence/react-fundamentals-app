// This component shows information about the current chosen course.

// Module 1.
// * Use template to show course's information:
// ** ID of course;
// ** Title;
// ** Description;
// ** Duration;
// ** List of authors;
// ** Creation date;
// * use <Button /> component to replace CourseInfo component with Courses component
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#course-info

// Module 2.
// * render component by route '/courses/:courseId'
// * use 'useParam' hook to get course id, remove prop 'showCourseId'
// * remove 'onBack' prop
// * use '<Link />' instead <Button /> component for 'BACK' button
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#course-info

// Module 3.
// * remove props 'coursesList', 'authorsList'
// * use selectors from store/selectors.js to get coursesList, authorsList from store

import React from "react";
import { useParams, Link } from "react-router-dom";
import { formatCreationDate, getCourseDuration } from "../../helpers";

import styles from "./styles.module.css";

export const CourseInfo = ({ coursesList, authorsList }) => {
  const { courseId } = useParams();
  const course = coursesList.find((course) => course.id === courseId);

  if (!course) return <p>Course not found</p>;

  const courseAuthors = course.authors
    .map((id) => authorsList.find((author) => author.id === id))
    .filter(Boolean)
    .map((author) => author.name);

  return (
    <div className={styles.container} data-testid="courseInfo">
      <h1>{course.title}</h1>
      <div className={styles.courseInfo}>
        <p className={styles.description}>{course.description}</p>
        <div>
          <p>
            <b>ID: </b>
            {course.id}
          </p>
          <p>
            <b>Duration: </b>
            {getCourseDuration(course.duration)}
          </p>
          <p>
            <b>Created: </b>
            {formatCreationDate(course.creationDate)}
          </p>
          <div>
            <b>Authors</b>
            <ul className={styles.authorsList}>
              {courseAuthors.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Link to="/courses" className={styles.backLink}>
        Back to courses
      </Link>
    </div>
  );
};
