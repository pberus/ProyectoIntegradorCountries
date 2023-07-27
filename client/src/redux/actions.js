import axios from "axios";

export const SEARCHCOUNTRY = "SEARCHCOUNTRY";
export const GETALLCOUNTRIES = "GETALLCOUNTRIES";
export const RESETCOUNTRY = "RESETCOUNTRY";
export const ONCLOSE = "ONCLOSE";

const URL = "http://localhost:3001/";

export const searchCountry = (country) => {
  return {
    type: SEARCHCOUNTRY,
    payload: country,
  };
};

export const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(URL + "countries");
      console.log("Action - Data:", data);
      return dispatch({ type: GETALLCOUNTRIES, payload: data });
    } catch (error) {
      console.log("Action - Error:", error.message);
    }
  };
};

export const onClose = (ID) => {
  return {
    type: ONCLOSE,
    payload: ID,
  };
};

//! para un boton reset?
export const resetCountry = () => {
  return { type: RESETCOUNTRY };
};


