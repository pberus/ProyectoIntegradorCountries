import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";
import { useState, useEffect } from "react";
import style from "./Card.module.css";

const Card = ({ character, onClose }) => {
  const { id, name, species, gender, image } = character;

  const myFavorites = useSelector((state) => state.myFavorites);
  const dispatch = useDispatch();

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  const handleFavorite = (data) => {
    if (isFav) {
      setIsFav(false);
      dispatch(removeFav(data));
    } else {
      setIsFav(true);
      dispatch(addFav(data));
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={style.Card}>
      <div className={style.buttons}>
        {isFav ? (
          <button onClick={() => handleFavorite(id)}>❤️</button>
        ) : (
          <button onClick={() => handleFavorite(character)}>🤍</button>
        )}
        {location.pathname === "/home" && (
          <button
            onClick={() => {
              onClose(id);
            }}
          >
            X
          </button>
        )}
      </div>
      <div className={style.details}>
        <NavLink to={`/detail/${id}`} className={style.name}>
          <h2>{name}</h2>
        </NavLink>
        <h3>{species}</h3>
        <h3>{gender}</h3>
        <img src={image} alt={name} />
      </div>
    </div>
  );
};

export default Card;