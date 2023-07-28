import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/card";
import {
  onCloseMyCountry,
  onCloseNewCountry,
  resetCountries,
} from "../../redux/actions";

const Cards = () => {
  const dispatch = useDispatch();
  const { myCountries, newCountries } = useSelector((state) => ({
    myCountries: state.myCountries,
    newCountries: state.newCountries,
  }));

  const handleClose = (ID) => {
    console.log(myCountries.length);

    if (myCountries.length) {
      if (myCountries.length === 1) {
        dispatch(onCloseMyCountry(ID));
        return dispatch(resetCountries());
      }

      return dispatch(onCloseMyCountry(ID));

    } else {
      if (newCountries.length === 1) {
        dispatch(onCloseNewCountry(ID));
        return dispatch(resetCountries());
      }

      return dispatch(onCloseNewCountry(ID));
    }
  };

  return (
    <div>
      {myCountries.length
        ? myCountries.map((country) => {
            //console.log("Country:", country.ID);
            return (
              <Card
                key={country.ID}
                country={country}
                handleClose={handleClose}
                title={"These are myCountries"}
              />
            );
          })
        : newCountries.map((country) => {
            //console.log("Country:", country.ID);
            return (
              <Card
                key={country.ID}
                country={country}
                handleClose={handleClose}
                title={"These are newCountries"}
              />
            );
          })}
    </div>
  );
};

export default Cards;
