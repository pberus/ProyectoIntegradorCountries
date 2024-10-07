/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeMyCountries,
  resetCountries,
  searchCountry,
} from "../../redux/actions";
import { useSelector } from "react-redux";
import style from "./searchBar.module.css"

const countriesURL = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/countries`
  : "http://localhost:3001/countries";

const SearchBar = ({handleResetFilterOrder}) => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const { newCountries, allCountries } = useSelector((state) => ({
    newCountries: state.newCountries,
    allCountries: state.allCountries,
  }));

  const onSearch = async (name) => {
    try {
      const searchURL = countriesURL + `/name?name=${name}`;
      const { data } = await axios(searchURL);

      const countryRepeted = newCountries.find(
        (country) => country.ID === data.ID
      );

      if (countryRepeted)
        return alert("You already added a country with that ID");

      dispatch(removeMyCountries());
      dispatch(searchCountry(data));
      handleResetFilterOrder()
    } catch (error) {
      error.response && error.response.data
        ? alert(error.response.data)
        : alert(error.message);
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setName(inputValue);
  };

  const handleSearch = () => {
    onSearch(name);
    setName("");
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * allCountries.length);
    const { name } = allCountries[randomIndex];
    onSearch(name);
    setName("");
  };

  const handleReset = () => {
    dispatch(resetCountries());
    handleResetFilterOrder()
  };

  return (
    <div className={style.SearchBar}>
      <input
        type='text'
        placeholder='Introduce country name '
        value={name}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleRandom}>Random</button>
      <button onClick={handleReset}>RESET</button>
    </div>
  );
};

export default SearchBar;
