/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Card = ({ country, handleClose }) => {
  const { ID, flag, name, continents } = country;

  const location = useLocation();

  return (
    <div>
      {location.pathname === "/home" && (
        <button onClick={() => handleClose(ID)}>X</button>
      )}
      <Link to={`/detail/${ID}`}>
        <div>
          <h2>{name}</h2>
          <h3>Continents:</h3>
          <ul>
            {continents?.map((continent, index) => (
              <li key={index}>{continent}</li>
            ))}
          </ul>
          <img src={flag} alt={`Flag of ${name}`} />
        </div>
      </Link>
    </div>
  );
};

export default Card;
