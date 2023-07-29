import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { filterCards, orderCards, resetFav } from "../../redux/actions";
import { useEffect, useState } from "react";
import style from "./Favorites.module.css";

const Favorites = () => {
  useEffect(() => {
    dispatch(resetFav());
  }, []);

  const [aux, setAux] = useState(false);

  const [order, setOrder] = useState("");
  const [filter, setFilter] = useState("");

  const { myFavorites } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleOrder = (event) => {
    event.preventDefault();
    const value = event.target.value;
    dispatch(orderCards(value));
    setAux(true); //! esto es para re-renderizar el componente
    setOrder(value);
  };

  const handleFilter = (event) => {
    event.preventDefault();
    const value = event.target.value;
    dispatch(filterCards(value));
    setFilter(value);
  };

  const resetButton = () => {
    dispatch(resetFav());
    setOrder("");
    setFilter("");
  };

  return (
    <div className={style.favContainer}>
      <h1>Favorites</h1>
      <div className={style.selectContainer}>
        <select
          className={style.buttons}
          value={order}
          onChange={handleOrder}
          name='order'
          defaultValue={""}
        >
          <option value='' disabled>
            Select Order
          </option>
          <option value='Ascendente'>Ascendente</option>
          <option value='Descendente'>Descendente</option>
        </select>
        <select
          className={style.buttons}
          value={filter}
          onChange={handleFilter}
          name='filter'
          defaultValue={""}
        >
          <option value='' disabled>
            Select Filter
          </option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Genderless'>Genderless</option>
          <option value='unknown'>unknown</option>
        </select>
        <button className={style.buttons} onClick={resetButton}>
          Reset
        </button>
      </div>
      <Cards characters={myFavorites} />
    </div>
  );
};

export default Favorites;

case FILTER:
      return {
        ...state,
        myFavorites: state.allCharacters.filter(
          (character) => character.gender === payload
        ),
      };
    case ORDER:
      const newOrder = state.allCharacters.sort((a, b) => {
        if (a.id > b.id) {
          return "Ascendente" === payload ? 1 : -1;
        }
        if (a.id < b.id) {
          return "Descendente" === payload ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        myFavorites: newOrder,
      };



      