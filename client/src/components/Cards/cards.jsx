import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/card";
import {
  onCloseMyCountry,
  onCloseNewCountry,
  resetCountries,
} from "../../redux/actions";
import { useState, useEffect } from "react";
import style from "./cards.module.css";

const countriesPerPage = 10;

const Cards = () => {
  const dispatch = useDispatch();
  const { myCountries, newCountries } = useSelector((state) => ({
    myCountries: state.myCountries,
    newCountries: state.newCountries,
  }));

  const [myCountriesPaginated, setMyCountriesPaginated] = useState([]);
  const [newCountriesPaginated, setNewCountriesPaginated] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0)
    setMyCountriesPaginated(myCountries.slice(0, countriesPerPage));
    setNewCountriesPaginated(newCountries.slice(0, countriesPerPage));
  }, [myCountries, newCountries]);

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;

    const firstIndex = prevPage * countriesPerPage;
    const lastIndex = firstIndex + countriesPerPage;

    if (myCountries.length) {
      setMyCountriesPaginated(myCountries.slice(firstIndex, lastIndex));
    } else {
      setNewCountriesPaginated(newCountries.slice(firstIndex, lastIndex));
    }

    setCurrentPage(prevPage);
  };

  const nextHandler = () => {
    const totalCountries = myCountries.length ? myCountries.length : newCountries.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * countriesPerPage;
    const lastIndex = firstIndex + countriesPerPage;

    if (firstIndex >= totalCountries) return;

    if (myCountries.length) {
      setMyCountriesPaginated(myCountries.slice(firstIndex, lastIndex));
    } else {
      setNewCountriesPaginated(newCountries.slice(firstIndex, lastIndex));
    }

    setCurrentPage(nextPage);
  };

  const handleClose = (ID) => {
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

  //se pone currentPage + 1 porque empieza en la 0

  return (
    <div>
      <h3>Page {currentPage + 1}</h3>
      <button onClick={prevHandler} disabled={currentPage === 0}>
        Prev
      </button>
      <button onClick={nextHandler} disabled={(myCountries.length ? myCountriesPaginated.length : newCountriesPaginated.length) < countriesPerPage || (myCountries.length ? myCountries.length : newCountries.length) === (currentPage + 1) * countriesPerPage }> 
        Next
      </button>
      <div className={style.cardsContainer}>
        {(myCountries.length ? myCountriesPaginated : newCountriesPaginated).map((country) => {
        return (
          <Card
            key={country.ID}
            country={country}
            handleClose={handleClose}
            title={myCountries.length ? "These are myCountries" : "These are newCountries"}
          />
        );
      })}
      </div>
      
    </div>
  );
};

export default Cards;

