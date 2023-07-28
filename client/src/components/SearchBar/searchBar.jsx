import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeMyCountries, resetCountries, searchCountry } from "../../redux/actions";
import { useSelector } from "react-redux";

const countriesURL = "http://localhost:3001/countries/";

const SearchBar = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const { myCountries, newCountries } = useSelector((state) => ({
    myCountries: state.myCountries,
    newCountries: state.newCountries,
  }));

  const onSearch = async (name) => {
    try {
      const searchURL = countriesURL + `name?name=${name}`;
      const { data } = await axios(searchURL);

      const countryRepeted = newCountries.find(
        (country) => country.ID === data.ID
      );

      if (countryRepeted)
        return alert("You already added a country with that ID");

      dispatch(removeMyCountries());
      dispatch(searchCountry(data));
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
    const randomIndex = Math.floor(Math.random() * myCountries.length);
    console.log(myCountries);
    const { name } = myCountries[randomIndex];
    onSearch(name);
    setName("");
  }; //! Arreglarlo y hacer que si apreto random me agregue el pais a newCountries, y pueda agregar todos los que quiera.

const handleReset = ()=>{
  dispatch(resetCountries())
}

  return (
    <div>
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
