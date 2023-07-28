import axios from "axios";

export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const ON_CLOSE = "ON_CLOSE";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID"
export const REMOVE_DETAIL = "REMOVE_DETAIL"
export const RESET_COUNTRIES = "RESET_COUNTRIES";
export const REMOVE_MY_COUNTRIES = "REMOVE_MY_COUNTRIES"

const URL = "http://localhost:3001/";

export const searchCountry = (country) => {
  return {
    type: SEARCH_COUNTRY,
    payload: country,
  };
};

export const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(URL + "countries");
      console.log("Action - Data:", data);
      return dispatch({ type: GET_ALL_COUNTRIES, payload: data });
    } catch (error) {
      console.log("Action - Error:", error.response);
    }
  };
};

export const onClose = (ID) => {
  return {
    type: ON_CLOSE,
    payload: ID,
  };
};

export const getCountryById = (ID)=>{
  return async (dispatch) => {
    try {
      const {data} = await axios(URL + `countries/${ID}`)
      return dispatch({type: GET_COUNTRY_BY_ID, payload: data})
    } catch (error) {
      console.log(error.response);
    }
  }
}

export const removeDetail = ()=>{
  return {type: REMOVE_DETAIL}
}

export const removeMyCountries = ()=>{
  return {type: REMOVE_MY_COUNTRIES}
}

//! para un boton reset?
export const resetCountries = () => {
  return { type: RESET_COUNTRIES };
};


