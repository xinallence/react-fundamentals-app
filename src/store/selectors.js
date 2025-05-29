// Module 3:
// * create selectors

export const selectCourses = (state) => state.courses;
export const selectAuthors = (state) => state.authors;
export const selectUserToken = (state) => state.user.token;
export const selectUserName = (state) => state.user.name;
export const getUserNameSelector = (state) => state.user.name;
export const getUserRoleSelector = (state) => state.user.role;
export const getUserTokenSelector = (state) => state.user.token;
export const getCoursesSelector = (state) => state.courses;
export const getAuthorsSelector = (state) => state.authors;
