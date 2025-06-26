// Module 1:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * add next components to the App component: Header, Courses and CourseInfo
// * pass 'mockedAuthorsList' and 'mockedCoursesList' to the Courses and CourseInfo components
// * use hook useState for saving selected courseId [showCourseId, handleShowCourse]

// Module 2:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * remove useState for selected courseId
// * use hook useState for storing list of courses and authors
// * import Routes and Route from 'react-router-dom'
// * Add Routes to the container div (do not include Header to the Routes since header will not be changed with pages)
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#add-the-router-to-the-app-component

// Module 3:
// * the App component and BrowserRouter components should be wrapped with Redux 'Provider' in src/index.js
// * remove 'mockedAuthorsList' and 'mockedCoursesList' constants amd import and their use throughout the project
// * use selector from store/selectors.js to get user token from store
// * get courses and authors from the server. Use courses/all and authors/all GET requests.
// * save courses and authors to the store. Use 'setCourses' and 'setAuthors' actions from appropriate slices here 'src/store/slices'
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-3/home-task/components#app-component

// Module 4:
// * rewrite old GET requests /courses/all with 'getCoursesThunk' from 'src/store/thunks/coursesThunk.js' using getCourses service from 'src/services.js'.
// * rewrite old GET requests /authors/all with 'getAuthorsThunk' from 'src/store/thunks/authorsThunk.js' using getAuthors service from 'src/services.js'.
// * wrap 'CourseForm' in the 'PrivateRoute' component
// * get authorized user info by 'user/me' GET request if 'localStorage' contains token

import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { Registration } from "./components/Registration/Registration";
import { Login } from "./components/Login/Login";
import { Courses } from "./components/Courses/Courses";
import { CourseInfo } from "./components/CourseInfo/CourseInfo";
import { CourseForm } from "./components/CourseForm/CourseForm";
import { mockedAuthorsList, mockedCoursesList } from "./constants";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [courses, setCourses] = useState(mockedCoursesList);
  const [authors, setAuthors] = useState(mockedAuthorsList);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    const userNameFromStorage = localStorage.getItem("userName");

    setToken(tokenFromStorage);
    setUserName(userNameFromStorage);

    if (location.pathname === "/" || location.pathname === "") {
      navigate(tokenFromStorage ? "/courses" : "/login", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    setUserName(null);
    navigate("/login");
  };

  const handleCreateCourse = (newCourse) => {
    setCourses((prev) => [...prev, newCourse]);
  };

  const handleCreateAuthor = (newAuthor) => {
    setAuthors((prev) => [...prev, newAuthor]);
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/registration";

  return (
    <div className={styles.wrapper}>
      {!isAuthPage && token && (
        <Header userName={userName} onLogout={handleLogout} />
      )}
      <div className={styles.container}>
        <Routes>
          <Route
            path="/login"
            element={<Login setToken={setToken} setUserName={setUserName} />}
          />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/courses"
            element={
              token ? (
                <Courses coursesList={courses} authorsList={authors} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              token ? (
                <CourseInfo coursesList={courses} authorsList={authors} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/courses/add"
            element={
              token ? (
                <CourseForm
                  authorsList={authors}
                  createCourse={handleCreateCourse}
                  createAuthor={handleCreateAuthor}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/courses" : "/login"} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
