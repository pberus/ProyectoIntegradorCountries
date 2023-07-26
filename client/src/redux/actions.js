import axios from "axios";

export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const SEARCHCOUNTRY = "SEARCHCOUNTRY";
export const GETALLCOUNTRIES = "GETALLCOUNTRIES";
export const RESETCOUNTRY = "RESETCOUNTRY"

const URL = "http://localhost:3001/";

export const login = (userData) => {
  const { email, password } = userData;
  return async (dispatch) => {
    try {
      const { data } = await axios(
        URL + `login/?email=${email}&password=${password}`
      );
      const { access } = data;

      return dispatch({ type: LOGIN, payload: access });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const logout = () => {
  return { type: LOGOUT };
};

export const searchCountry = (country) => {
  return {
    type: SEARCHCOUNTRY,
    payload: country,
  };
};

export const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(URL + "/countries");
      return dispatch({ type: GETALLCOUNTRIES, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};
//! para la funcion onClose
export const resetCountry = ()=>{
  return {type: RESETCOUNTRY}
}