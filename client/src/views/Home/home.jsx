/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Nav, Cards } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCards,
  getAllCountries,
  orderCards,
  resetFilter,
} from "../../redux/actions";
import { useLocation } from "react-router-dom";
import imgOrdenAsce from "../../assets/orden-ascendente(2).png"
import imgOrdenDesc from "../../assets/orden-descendente(1).png" 

//"ascending"
//"descending"

const Home = ({ logout }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { myCountries, newCountries } = useSelector((state) => ({
    myCountries: state.myCountries,
    newCountries: state.newCountries,
  }));

  useEffect(() => {
    location.pathname === "/home" &&
      !myCountries.length &&
      !newCountries.length &&
      dispatch(getAllCountries());
  }, []);

  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [aux, setAux] = useState(false);
  const [orderValue, setOrderValue] = useState("Name");

  const handleFilter = (event) => {
    event.preventDefault();
    const value = event.target.value;

    if (value === "") {
      //Para que al apretar la primera option, se resetee el filtro
      dispatch(resetFilter());
      return setFilter("");
    }

    dispatch(filterCards(value));
    setFilter(value);
  };

  const handleOrder = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setOrderValue(value);

    if (ordenAsc === true) {
      dispatch(orderCards(value, "ascending"));
      setAux(!aux);
      return setOrder(value);
    }

    dispatch(orderCards(value, "descending"));
    setAux(!aux);
    return setOrder(value);
  }; //! Terminarlo y chequar las imperfecciones

  const handleResetFilterOrder = () => {
    dispatch(resetFilter());
    //! agregar un reserOrder o dejar solo el resetFilter?
    setFilter("");
    setOrder("");
  };

  const handleOrderClick = () => {
    if (ordenAsc === true) {
      //el valor de orderAsc es el orden anterior, por ende aplico el dispatch para el contrario ya que quiero cambiar el orden
      dispatch(orderCards(orderValue, "descending"));
      setAux(!aux);
      setOrder(orderValue);

      return setOrdenAsc(!ordenAsc);
    }

    dispatch(orderCards(orderValue, "ascending"));
    setAux(!aux);
    setOrder(orderValue);

    return setOrdenAsc(!ordenAsc);
  };

  return (
    <div>
      <h1>ESTE ES EL HOME</h1>
      <Nav logout={logout} handleResetFilterOrder={handleResetFilterOrder} />

      <div>
        <select name='filter' value={filter} onChange={handleFilter}>
          <option value=''>Select Filter</option>
          <optgroup label='Country Continents'>
            <option value='Continent - Africa'>Africa</option>
            <option value='Continent - Antarctica'>Antarctica</option>
            <option value='Continent - Asia'>Asia</option>
            <option value='Continent - Europe'>Europe</option>
            <option value='Continent - North America'>North America</option>
            <option value='Continent - Oceania'>Oceania</option>
            <option value='Continent - South America'>South America</option>
          </optgroup>
          <optgroup label='Activity Difficults'>
            <option value='Difficulty 1'>Difficulty 1</option>
            <option value='Difficulty 2'>Difficulty 2</option>
            <option value='Difficulty 3'>Difficulty 3</option>
            <option value='Difficulty 4'>Difficulty 4</option>
            <option value='Difficulty 5'>Difficulty 5</option>
          </optgroup>
          <optgroup label='Activity Season'>
            <option value='Summer'>Summer</option>
            <option value='Autumn'>Autumn</option>
            <option value='Winter'>Winter</option>
            <option value='Spring'>Spring</option>
          </optgroup>
        </select>

        <select name='order' value={order} onChange={handleOrder}>
          <option value=''>Select Order</option>
          <optgroup label='Country'>
            <option value='Country Name'>Name ^ A-Z</option>
            <option value='Capital'>Capital ^ A-Z</option>
            <option value='Subregion'>Subregion ^ A-Z</option>
            <option value='Population'>Population ^ 0-ထ</option>
            <option value='Area'>Area ^ 0-ထ</option>
          </optgroup>
          <optgroup label='Activity (The first in each country)'>
            <option value='Activity Name'>Name ^ A-Z</option>
            <option value='Difficulty'>Difficulty ^ 1-5</option>
            <option value='Duration'>Duration ^ 0-ထ</option>
            <option value='Season'>Season ^ A-Z</option>
          </optgroup>
        </select>

        <button onClick={handleOrderClick}>
          {ordenAsc ? (
            <img src={imgOrdenAsce} alt='Order Asce' />
          ) : (
            <img src={imgOrdenDesc} alt='OrderDesc' />
          )}
        </button>

        <button onClick={handleResetFilterOrder}>Reset Filter/Order</button>
      </div>

      {myCountries.length ? (
        <h2>
          <u>These are myCountries</u>
        </h2>
      ) : (
        <h2>
          <u>These are newCountries</u>
        </h2>
      )}
      <Cards />
    </div>
  );
};

export default Home;
