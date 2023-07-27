import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountry } from "../../redux/actions";
import { useSelector } from "react-redux";

const countriesURL = "http://localhost:3001/countries/";

const SearchBar = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const myCountries = useSelector((state) => state.myCountries);

  const onSearch = async (name) => {
    try {
      const searchURL = countriesURL + `name?name=${name}`;
      const { data } = await axios(searchURL);

      const countryRepeted = myCountries.find(
        (country) => country.ID === data.ID
      );

      if (countryRepeted)
        return alert("You already added a country with that ID");

      return dispatch(searchCountry(data));
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
  };

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
    </div>
  );
};

export default SearchBar;