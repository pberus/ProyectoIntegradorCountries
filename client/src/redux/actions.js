import axios from "axios";

export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const ON_CLOSE_MY_COUNTRY = "ON_CLOSE_MY_COUNTRY";
export const ON_CLOSE_NEW_COUNTRY = "ON_CLOSE_NEW_COUNTRY";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const REMOVE_DETAIL = "REMOVE_DETAIL";
export const RESET_COUNTRIES = "RESET_COUNTRIES";
export const REMOVE_MY_COUNTRIES = "REMOVE_MY_COUNTRIES";
export const FILTER_CARDS = "FILTER_CARDS";
export const ORDER_CARDS = "ORDER_CARDS";
export const RESET_FILTER_ORDER = "RESET_FILTER_ORDER";
export const REMOVE_COUNTRIES = "REMOVE_COUNTRIES";
export const RESET_WITH_ACTIVITIES = "RESET_WITH_ACTIVITIES";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export const searchCountry = (country) => {
  return {
    type: SEARCH_COUNTRY,
    payload: country,
  };
};

export const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(URL + "/countries");
      console.log("Action - Data:", data);
      return dispatch({ type: GET_ALL_COUNTRIES, payload: data });
    } catch (error) {
      console.log("Action - Error:", error.response);
      alert(error.message);
    }
  };
};

export const onCloseMyCountry = (ID) => {
  return {
    type: ON_CLOSE_MY_COUNTRY,
    payload: ID,
  };
};

export const onCloseNewCountry = (ID) => {
  return {
    type: ON_CLOSE_NEW_COUNTRY,
    payload: ID,
  };
};

export const getCountryById = (ID) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(URL + `/countries/${ID}`);
      return dispatch({ type: GET_COUNTRY_BY_ID, payload: data });
    } catch (error) {
      error.response && error.response.data
        ? alert(error.response.data)
        : alert(error.message);
    }
  };
};

export const removeDetail = () => {
  return { type: REMOVE_DETAIL };
};

export const removeMyCountries = () => {
  return { type: REMOVE_MY_COUNTRIES };
};

//! para un boton reset?
export const resetCountries = () => {
  return { type: RESET_COUNTRIES };
};

export const filterCards = (filter) => {
  return {
    type: FILTER_CARDS,
    payload: filter,
  };
};

export const orderCards = (atribute, order) => {
  return {
    type: ORDER_CARDS,
    payload: {
      atribute,
      order,
    },
  };
};

export const resetFilterOrder = () => {
  return {
    type: RESET_FILTER_ORDER,
  };
};

export const resetWithActivities = () => {
  return {
    type: RESET_WITH_ACTIVITIES,
  };
};
