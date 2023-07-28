import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/card";
import { onClose, resetCountries } from "../../redux/actions";

const Cards = () => {
  const dispatch = useDispatch();
  const myCountries = useSelector((state) => state.myCountries);

  const handleClose = (ID) => {
    console.log(myCountries.length);
    if (myCountries.length === 1) {
      dispatch(onClose(ID));
      return dispatch(resetCountries())
    }
    dispatch(onClose(ID));
  };

  return (
    <div>  
      {myCountries?.map((country) => {
        //console.log("Country:", country.ID);
        return (
          <Card key={country.ID} country={country} handleClose={handleClose} />
        );
      })}
    </div>
  );
};

export default Cards;
