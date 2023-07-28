import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_ID,
  ON_CLOSE_MY_COUNTRY,
  ON_CLOSE_NEW_COUNTRY,
  REMOVE_DETAIL,
  REMOVE_MY_COUNTRIES,
  RESET_COUNTRIES,
  SEARCH_COUNTRY,
} from "./actions";

const initialState = {
  allCountries: [],
  myCountries: [],
  newCountries: [],
  countryDetail: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_COUNTRY:
      return {
        ...state,
        newCountries: [payload, ...state.newCountries], //esta al revez porque quiero que el country se ponga primero en el array
      };
    case GET_ALL_COUNTRIES:
      console.log("Reducer - Payload:", payload);
      return {
        ...state,
        allCountries: payload,
        myCountries: payload,
      };
    case ON_CLOSE_MY_COUNTRY:
      return {
        ...state,
        myCountries: state.myCountries.filter(
          (country) => country.ID !== payload
        ),
      };
    case ON_CLOSE_NEW_COUNTRY:
      return {
        ...state,
        newCountries: state.newCountries.filter(
          (country) => country.ID !== payload
        ),
      };
    case GET_COUNTRY_BY_ID:
      return {
        ...state,
        countryDetail: payload,
      };
    case REMOVE_DETAIL:
      return {
        ...state,
        countryDetail: {},
      };
    case REMOVE_MY_COUNTRIES:
      return {
        ...state,
        myCountries: [],
      };
    case RESET_COUNTRIES:
      return {
        ...state,
        myCountries: state.allCountries,
        newCountries: [],
      };
    default:
      return { ...state };
  }
};

export default rootReducer;

//! Analizar crear varios reducers y relacionarlos
