import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import style from "./Detail.module.css";

const Detail = () => {
  const [
    { name, status, species, gender, origin, location, image },
    setCharacter,
  ] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);

  const navigate = useNavigate();

  return (
    <div className={style.detailContainer}>
      <div className={style.details}>
        <button onClick={() => navigate("/home")}>Volver</button>
        <h1>{name}</h1>
        <h3>STATUS | {status}</h3>
        <h3>GENDER | {gender}</h3>
        <h3>SPECIE | {species}</h3>
        <h3>ORIGIN | {origin?.name}</h3>
        <h3>LOCATION | {location?.name}</h3>
      </div>
      <div className={style.detailImg}>
        <img src={image} alt={name} />
      </div>
    </div>
  );
};

export default Detail;