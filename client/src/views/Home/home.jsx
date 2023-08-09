/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Nav, Cards } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCards,
  getAllCountries,
  orderCards,
  resetFilterOrder,
} from "../../redux/actions";
import { useLocation } from "react-router-dom";
import imgOrdenAsce from "../../assets/orden-ascendente(1).png"
import imgOrdenDesc from "../../assets/orden-descendente(2).png"
import style from "./home.module.css";

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
    dispatch(resetFilterOrder()) //puse esto porque al guardar los valores del filtro y orden en estados locales, al volver a cargar la pagina se restablecen, pero los countries no porque son estados globales. Si lo quiero es mantener los paises y los filtros y ordenes, tengo que establecerlos como estados globales. 
    location.pathname === "/home" &&
      !myCountries.length &&
      !newCountries.length &&
      dispatch(getAllCountries());
  }, []);

  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [aux, setAux] = useState(false);
  const [orderValue, setOrderValue] = useState("Country Name");

  const handleFilter = (event) => {
    event.preventDefault();
    const value = event.target.value;

    dispatch(filterCards(value));
    setFilter(value);
    setOrder("") //lo puse asi porque no se como hacer para mantener el orden cuando cambio el filtro
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
  }; 

  const handleResetFilterOrder = () => {
    dispatch(resetFilterOrder());
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
    <div className={style.homeContainer}>
      <h1>App Countries</h1>
      <div className={style.nav}>
        <Nav logout={logout} handleResetFilterOrder={handleResetFilterOrder}/>
      </div>
      

      <div className={style.filterOrder}>
        <select name='filter' value={filter} onChange={handleFilter}>
          <option value='' disabled>Select Filter</option>
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
          <option value='' disabled>Select Order</option>
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
