import {
  SEARCHCOUNTRY,
  GETALLCOUNTRIES,
  RESETCOUNTRY,
  ONCLOSE,
} from "./actions";

const initialState = { allCountries: [], myCountries: [] };

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCHCOUNTRY:
      return {
        ...state,
        myCountries: [payload],
      };
    case GETALLCOUNTRIES:
      console.log("Reducer - Payload:", payload);
      return {
        ...state,
        allCountries: payload,
        myCountries: payload,
      };
    case ONCLOSE:
      return {
        ...state,
        myCountries: state.myCountries.filter(
          (country) => country.ID !== payload
        ),
      };
    case RESETCOUNTRY:
      return {
        ...state,
        myCountries: [...state.allCountries],
      };
    default:
      return { ...state };
  }
};

export default rootReducer;

//! Analizar crear varios reducers y relacionarlos
