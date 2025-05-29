import { login } from "../../services";
import { setUserData, removeUserData } from "../slices/userSlice";

export const getUserThunk = (credentials) => async (dispatch) => {
  try {
    const userData = await login(credentials);
    localStorage.setItem("token", userData.token);
    dispatch(setUserData(userData));
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const logoutThunk = () => (dispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch(removeUserData());
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
