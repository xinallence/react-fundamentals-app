import { getAuthors } from "../../services";
import { setAuthors, saveAuthor } from "../slices/authorsSlice";

export const createAuthorThunk = (newAuthor) => async (dispatch) => {
  try {
    dispatch(saveAuthor(newAuthor));
  } catch (error) {
    console.error("Failed to create author:", error);
  }
};

export const getAuthorsThunk = () => async (dispatch) => {
  try {
    const response = await getAuthors();
    dispatch(setAuthors(response));
  } catch (error) {
    console.error("Failed to fetch authors:", error);
  }
};
