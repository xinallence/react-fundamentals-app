import {
  getCourses,
  createCourse,
  deleteCourse as apiDeleteCourse,
  updateCourse as apiUpdateCourse,
} from "../../services";

import {
  setCourses,
  saveCourse,
  deleteCourse,
  updateCourse,
} from "../slices/coursesSlice";

export const getCoursesThunk = () => async (dispatch) => {
  try {
    const courses = await getCourses();
    dispatch(setCourses(courses));
  } catch (error) {
    console.error("Failed to fetch courses:", error);
  }
};

export const createCourseThunk = (newCourse) => async (dispatch) => {
  try {
    const createdCourse = await createCourse(newCourse);
    dispatch(saveCourse(createdCourse));
  } catch (error) {
    console.error("Failed to create course:", error);
  }
};

export const deleteCourseThunk = (courseId) => async (dispatch) => {
  try {
    await apiDeleteCourse(courseId);
    dispatch(deleteCourse(courseId));
  } catch (error) {
    console.error("Failed to delete course:", error);
  }
};

export const updateCourseThunk = (updatedCourse) => async (dispatch) => {
  try {
    const result = await apiUpdateCourse(updatedCourse);
    dispatch(updateCourse(result));
  } catch (error) {
    console.error("Failed to update course:", error);
  }
};
