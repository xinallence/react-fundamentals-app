import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (_, action) => action.payload,
    saveCourse: (state, action) => {
      state.push(action.payload);
    },
    deleteCourse: (state, action) =>
      state.filter((course) => course.id !== action.payload),
    updateCourse: (state, action) => {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
  },
});

export const { setCourses, saveCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;

export default coursesSlice.reducer;
