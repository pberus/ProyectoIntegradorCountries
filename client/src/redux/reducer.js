import {
  FILTER_CARDS,
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_ID,
  ON_CLOSE_MY_COUNTRY,
  ON_CLOSE_NEW_COUNTRY,
  ORDER_CARDS,
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
  let sortFunction; //*Para ORDER_CARDS
  const compareStringsSecondary = (a, b) => { //* Para ORDER_CARDS
    //?funcion para que si ambas letras son iguales, que compare con las siguientes y asi.
    if (a === b) {
      return 0;
    }
    console.log(a, b);
    const firstComparison = a[0].localeCompare(b[0]);
    console.log(firstComparison);
    if (firstComparison !== 0) {
      return firstComparison;
    }
    return compareStringsSecondary(a.slice(1), b.slice(1));
  };

  switch (type) {
    case SEARCH_COUNTRY:
      aux = [payload, ...state.newCountries]; //esta al revez porque quiero que el country se ponga primero en el array
      return {
        ...state,
        newCountries: aux,
        newCountriesBackUp: [...aux], //se aplica [...] porque sino ambos iban a estar en el mismo espacio en memoria
      };
    case GET_ALL_COUNTRIES:
      console.log("Reducer - Payload:", payload);
      aux = payload;
      return {
        ...state,
        allCountries: aux,
        myCountries: [...aux],
        myCountriesBackUp: [...aux], //Esta copia sigue teniendo diferente espacio en memoria que myCountries.
      };
    case ON_CLOSE_MY_COUNTRY:
      aux = state.myCountries.filter((country) => country.ID !== payload);
      return {
        ...state,
        myCountries: aux,
        myCountriesBackUp: [...aux],
      };
    case ON_CLOSE_NEW_COUNTRY:
      aux = state.newCountries.filter((country) => country.ID !== payload);
      return {
        ...state,
        newCountries: aux,
        newCountriesBackUp: [...aux],
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
      aux = state.allCountries;
      return {
        ...state,
        myCountries: aux,
        myCountriesBackUp: [...aux],
        newCountries: [],
        newCountriesBackUp: [],
      };
    case FILTER_CARDS: //! FILTER CARDS
      //? Si el payload (value) incluye el string Continent, aplico esto
      if (payload.includes("Continent")) {
        if (state.myCountriesBackUp.length) {
          return {
            ...state,
            myCountries: state.myCountriesBackUp.filter((myCountry) =>
              myCountry.continents.includes(payload.slice(12))
            ),
          };
        }
        return {
          ...state,
          newCountries: state.newCountriesBackUp.filter((myCountry) =>
            myCountry.continents.includes(payload.slice(12))
          ),
        };
      }
      //? Si incluye Difficulty, esto
      if (payload.includes("Difficulty")) {
        console.log(payload);
        if (state.myCountriesBackUp.length) {
          return {
            ...state,
            myCountries: state.myCountriesBackUp.filter((myCountry) => {
              const activityFilted = myCountry.Activities.filter(
                (activity) => activity.difficulty === payload.slice(11)
              );
              return activityFilted.length > 0;
            }),
          };
        }
        return {
          ...state,
          newCountries: state.newCountriesBackUp.filter((myCountry) => {
            const activityFilted = myCountry.Activities.filter(
              (activity) => activity.difficulty === payload.slice(11)
            );
            return activityFilted.length > 0;
          }),
        };
      }
      //? Y por ultimo, si no incluye ninguna de las dos, para activity season
      if (state.myCountriesBackUp.length) {
        return {
          ...state,
          myCountries: state.myCountriesBackUp.filter((myCountry) => {
            const activityFilted = myCountry.Activities.filter(
              (activity) => activity.season === payload
            );
            return activityFilted.length > 0;
          }),
        };
      }
      return {
        ...state,
        newCountries: state.newCountriesBackUp.filter((myCountry) => {
          const activityFilted = myCountry.Activities.filter(
            (activity) => activity.season === payload
          );
          return activityFilted.length > 0;
        }),
      };
    case ORDER_CARDS: //!ORDER CARDS
      //? FUNCION SORT
      sortFunction = (array)=> {
        return array.sort((a, b) => {
          if (payload.atribute === "Country Name") {
            return payload.order === "ascending"
              ? compareStringsSecondary(a.name, b.name)
              : compareStringsSecondary(b.name, a.name);
          }
          if (payload.atribute === "Capital") {
            return payload.order === "ascending"
              ? compareStringsSecondary(a.capital[0], b.capital[0])
              : compareStringsSecondary(b.capital[0], a.capital[0]);
          }
          if (payload.atribute === "Subregion") {
            return payload.order === "ascending"
              ? compareStringsSecondary(a.subregion, b.subregion)
              : compareStringsSecondary(b.subregion, a.subregion);
          }
          if (payload.atribute === "Population") {
            return payload.order === "ascending"
              ? parseInt(a.population) - parseInt(b.population)
              : parseInt(b.population) - parseInt(a.population);
          }
          if (payload.atribute === "Area") {
            return payload.order === "ascending"
              ? parseInt(a.area) - parseInt(b.area)
              : parseInt(b.area) - parseInt(a.area);
          }
          //Para ordenar segun las Activities que es un array dentro de cada pais:
          const aHasActivities = a.Activities.length > 0;
          const bHasActivities = b.Activities.length > 0;
          if (payload.atribute === "Activity Name") {
            if (payload.order === "ascending") {
              if (!aHasActivities && bHasActivities) return -1;
              if (aHasActivities && !bHasActivities) return 1;
              if (!aHasActivities && !bHasActivities) return 0;
              return compareStringsSecondary(
                a.Activities[0].name,
                b.Activities[0].name
              );
            } else {
              if (!aHasActivities && bHasActivities) return 1;
              if (aHasActivities && !bHasActivities) return -1;
              if (!aHasActivities && !bHasActivities) return 0;
              return compareStringsSecondary(
                b.Activities[0].name,
                a.Activities[0].name
              );
            }
          }
          if (payload.atribute === "Difficulty") {
            if (payload.order === "ascending") {
              if (!aHasActivities && bHasActivities) return -1;
              if (aHasActivities && !bHasActivities) return 1;
              if (!aHasActivities && !bHasActivities) return 0;
              return (
                parseInt(a.Activities[0].difficulty) -
                parseInt(b.Activities[0].difficulty)
              );
            } else {
              if (!aHasActivities && bHasActivities) return 1;
              if (aHasActivities && !bHasActivities) return -1;
              if (!aHasActivities && !bHasActivities) return 0;
              return (
                parseInt(b.Activities[0].difficulty) -
                parseInt(a.Activities[0].difficulty)
              );
            }
          }
          if (payload.atribute === "Duration") {
            if (payload.order === "ascending") {
              if (!aHasActivities && bHasActivities) return -1;
              if (aHasActivities && !bHasActivities) return 1;
              if (!aHasActivities && !bHasActivities) return 0;
              return (
                parseInt(a.Activities[0].duration) -
                parseInt(b.Activities[0].duration)
              );
            } else {
              if (!aHasActivities && bHasActivities) return 1;
              if (aHasActivities && !bHasActivities) return -1;
              if (!aHasActivities && !bHasActivities) return 0;
              return (
                parseInt(b.Activities[0].duration) -
                parseInt(a.Activities[0].duration)
              );
            }
          }
          //ESTE ULTIMO SERIA PARA if(payload.atribute === "Season")
          if (payload.order === "ascending") {
            if (!aHasActivities && bHasActivities) return -1;
            if (aHasActivities && !bHasActivities) return 1;
            if (!aHasActivities && !bHasActivities) return 0;
            return compareStringsSecondary(
              a.Activities[0].season,
              b.Activities[0].season
            );
          }
          if (!aHasActivities && bHasActivities) return 1;
          if (aHasActivities && !bHasActivities) return -1;
          if (!aHasActivities && !bHasActivities) return 0;
          return compareStringsSecondary(
            b.Activities[0].season,
            a.Activities[0].season
          );
        });
      };
      //* Aplico el sort dependiendo con cual array de paises estemos:
      if (state.myCountriesBackUp.length) {
        return {
          ...state,
          myCountries: sortFunction([...state.myCountries]),
        };
      }
      return {
        ...state,
        newCountries: sortFunction([...state.newCountries]),
      };
    case RESET_FILTER:
      if (state.myCountriesBackUp.length) {
        return {
          ...state,
          myCountries: state.myCountriesBackUp,
        };
      }

      return {
        ...state,
        newCountries: state.newCountriesBackUp,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;

//! Analizar crear varios reducers y relacionarlos
