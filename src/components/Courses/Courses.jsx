// Module 1:
// * render list of components using 'CourseCard' component for each course
// * render 'ADD NEW COURSE' button (reuse Button component)
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#courses-component
// * render EmptyCourseList component when no courses
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#emptycourselist-component
// * DO NOT map authors to the course inside Courses.jsx component (DO it inside CourseCard)

// Module 2:
// * render this component by route '/courses'
// * navigate to this component if 'localStorage' contains user's token
// * navigate to the route courses/add by clicking 'Add New Course' button, use 'Link' component from 'react-router-dom'
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#courses

// Module 3:
// * stop using mocked courses and authors data
// * delete props 'coursesList' and 'authorsList'
// * use useSelector to get courses and authors from the store
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-3/home-task/components#courses-component

// Module 4:
// navigate to '/courses/add' route by clicking 'ADD NEW COURSE' button in the 'EmptyCourseList'.
// show message 'You don't have permissions to create a course. Please log in as ADMIN' by clicking ADD NEW COURSE button in the 'EmptyCourseList'.
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-4/home-task/components#emptycourselist-component

// Module 5:
// * proposed cases for unit tests:
//   ** Courses should display amount of CourseCard equal length of courses array.
//   ** CourseForm should be shown after a click on the "Add new course" button.

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../../common/Button/Button";
import { CourseCard } from "./components";
import styles from "./styles.module.css";

export const Courses = () => {
  const courses = useSelector((state) => state.courses);
  const user = useSelector((state) => state.user);

  if (!courses || courses.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2>Your List Is Empty</h2>
        <Link to="/courses/add" className={styles.noUnderline}>
          <Button buttonText="Add new course" data-testid="addCourse" />
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Courses</h1>
        {user?.isAuth && (
          <Link to="/courses/add" className={styles.noUnderline}>
            <Button buttonText="Add new course" data-testid="addCourse" />
          </Link>
        )}
      </div>
      <div className={styles.courseList}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
