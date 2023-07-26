import { LOGIN, LOGOUT, SEARCHCOUNTRY, GETALLCOUNTRIES, RESETCOUNTRY } from "./actions";

const initialState = { access: false, allCountries: [], myCountries: [] };

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        access: payload,
      };
    case LOGOUT:
      return {
        ...state,
        access: false,
      };
    case SEARCHCOUNTRY:
      return {
        ...state,
        myCountries: [payload],
      };
    case GETALLCOUNTRIES:
      return {
        ...state,
        allCountries: [payload],
        myCountries: [payload]
      }
    case RESETCOUNTRY:
      return {
        ...state,
        myCountries: [...state.allCountries]
      }
    default:
      return { ...state };
  }
};

export default rootReducer;

//! Analizar crear varios reducers y relacionarlos
