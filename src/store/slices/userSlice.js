import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  isAuth: !!tokenFromStorage,
  name: "",
  email: "",
  token: tokenFromStorage || "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (_, action) => {
      const { name, email, token } = action.payload;
      localStorage.setItem("token", token);
      return {
        isAuth: true,
        name,
        email,
        token,
      };
    },
    removeUserData: () => {
      localStorage.removeItem("token");
      return {
        isAuth: false,
        name: "",
        email: "",
        token: "",
      };
    },
  },
});

export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
