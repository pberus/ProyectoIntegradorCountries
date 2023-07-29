import {
  FILTER_CARDS,
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_ID,
  ON_CLOSE_MY_COUNTRY,
  ON_CLOSE_NEW_COUNTRY,
  REMOVE_DETAIL,
  REMOVE_MY_COUNTRIES,
  RESET_COUNTRIES,
  RESET_FILTER,
  SEARCH_COUNTRY,
} from "./actions";

const initialState = {
  allCountries: [],
  myCountries: [],
  myCountriesBackUp: [],
  newCountries: [],
  newCountriesBackUp: [],
  countryDetail: {},
};

const rootReducer = (state = initialState, { type, payload }) => {

  let aux; //La declaro para que los backUps sean iguales a los otros con lo que se haya aplicado en el momento de cada case. Si no declaro esta variable, por ej, en el caso del filter el backUp no iba a recibir el array con el filter aplicado.

  switch (type) {
    case SEARCH_COUNTRY:
      aux = [payload, ...state.newCountries] //esta al revez porque quiero que el country se ponga primero en el array
      return {
        ...state,
        newCountries: aux, 
        newCountriesBackUp: [...aux] //se aplica [...] porque sino ambos iban a estar en el mismo espacio en memoria
      };
    case GET_ALL_COUNTRIES:
      console.log("Reducer - Payload:", payload);
      aux = payload
      return {
        ...state,
        allCountries: aux,
        myCountries: [...aux],
        myCountriesBackUp: [...aux], //Esta copia sigue teniendo diferente espacio en memoria que myCountries.
      };
    case ON_CLOSE_MY_COUNTRY:
      aux = state.myCountries.filter(
          (country) => country.ID !== payload
        )
      return {
        ...state,
        myCountries: aux,
        myCountriesBackUp: [...aux],
      };
    case ON_CLOSE_NEW_COUNTRY:
      aux = state.newCountries.filter(
          (country) => country.ID !== payload
        )
      return {
        ...state,
        newCountries: aux,
        newCountriesBackUp: [...aux]
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
        myCountriesBackUp: [],
      };
    case RESET_COUNTRIES:
      aux = state.allCountries
      return {
        ...state,
        myCountries: aux,
        myCountriesBackUp: [...aux],
        newCountries: [],
        newCountriesBackUp: [],
      };
    case FILTER_CARDS:
      //* Si el payload (value) incluye el string Continent, aplico esto
      if (payload.includes("Continent")){
        if(state.myCountriesBackUp.length){
          return {
            ...state,
            myCountries: state.myCountriesBackUp.filter((myCountry) => myCountry.continents.includes(payload.slice(12))),
          }
        }
        return {
          ...state,
          newCountries: state.newCountriesBackUp.filter((myCountry) => myCountry.continents.includes(payload.slice(12))),
        }
      }
      //* Si incluye Difficulty, esto
      if (payload.includes("Difficulty")){
        console.log(payload);
        if(state.myCountriesBackUp.length){
          return {
            ...state,
            myCountries: state.myCountriesBackUp.filter((myCountry) => {
              const activityFilted = myCountry.Activities.filter(activity => activity.difficulty === payload.slice(11))
              return activityFilted.length > 0
            }),
          }
        }
        return {
          ...state,
          newCountries: state.newCountriesBackUp.filter((myCountry) => {
            const activityFilted = myCountry.Activities.filter(activity => activity.difficulty === payload.slice(11))
            return activityFilted.length > 0
          }),
        }
      }
      //* Y por ultimo, si no incluye ninguna de las dos, para activity season
      if(state.myCountriesBackUp.length){
        return {
          ...state,
          myCountries: state.myCountriesBackUp.filter((myCountry) => {
            const activityFilted = myCountry.Activities.filter(activity => activity.season === payload)
            return activityFilted.length > 0
          }),
        }
      }
      return {
        ...state,
        newCountries: state.newCountriesBackUp.filter((myCountry) => {
          const activityFilted = myCountry.Activities.filter(activity => activity.season === payload)
          return activityFilted.length > 0
        }),
      }
    case RESET_FILTER:
      if (state.myCountriesBackUp.length){
        return {
          ...state,
          myCountries: state.myCountriesBackUp,
        }
      }

      return {
        ...state,
        newCountries: state.newCountriesBackUp,
      }
    default:
      return { ...state };
  }
};

export default rootReducer;

//! Analizar crear varios reducers y relacionarlos
