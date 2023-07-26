import axios from "axios";

export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";

export const login = (userData) => {
  try {
    const URL = "http://localhost:3001/";
    const { email, password } = userData;
    return async (dispatch) => {
      const { data } = await axios(
        URL + `login/?email=${email}&password=${password}`
      );
      const { access } = data;

      return dispatch({ type: LOGIN, payload: access });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = () => {
  return { type: LOGOUT };
};
