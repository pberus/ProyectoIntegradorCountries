/* eslint-disable react/prop-types */
import {useLocation} from "react-router-dom";

const Card = ({ country, handleClose }) => {
  const { ID, flag, name, continents } = country;

  const location = useLocation();

  return (
    <div>
      {location.pathname === "/home" && (
        <button onClick={() => handleClose(ID)}>X</button>
      )}
      <h3>{name}</h3>
      <h3>{continents}</h3>
      <img src={flag} alt="" />
    </div>
  );
};

export default Card;
