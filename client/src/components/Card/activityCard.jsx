/* eslint-disable react/prop-types */
import style from "./card.module.css";

const ActivityCard = ({ activity }) => {
  const { name, difficulty, duration, season, Countries } = activity;
  
  return (
    <div className={style.Card}>
      <h2>{name}</h2>
      <h4>Difficulty: {difficulty}</h4>
      <h4>Duration: {duration}</h4>
      <h4>Season: {season}</h4>
      <h4>Countries:</h4>
      <ul>
        {Countries?.map((country, index) => (
          <li key={index}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityCard;
