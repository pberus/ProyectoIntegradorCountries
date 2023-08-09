import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryById, removeDetail } from "../../redux/actions";
import style from "./detail.module.css"

const Detail = () => {
  const { ID } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    name,
    flag,
    continents,
    capital,
    subregion,
    area,
    population,
    Activities,
  } = useSelector((state) => state.countryDetail);

  useEffect(() => {
    dispatch(getCountryById(ID));
    return () => {
      dispatch(removeDetail());
    };
  }, [ID, dispatch]);

  return (
    <div className={style.Detail}>
      <button onClick={() => navigate("/home")}>Volver</button>
      <h1>{name}</h1>
      <h3>ID: {ID}</h3>
      <img src={flag} alt={`Flag of ${name}`} />
      <h3>CONTINENTS:</h3>
      <ul>
        {continents?.map((continent, index) => (
          <li key={index}>{continent}</li>
        ))}
      </ul>
      <h3>CAPITAL:</h3>
      <ul>
        {capital?.map((capital, index) => (
          <li key={index}>{capital}</li>
        ))}
      </ul>
      <h3>SUBREGION: {subregion}</h3>
      <h3>AREA: {area}</h3>
      <h3>POPULATION: {population}</h3>
      <h3>ACTIVITIES:</h3>
      <ul>
        {Activities?.map((activity, index) => (
          <li key={index}>{activity.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Detail;
