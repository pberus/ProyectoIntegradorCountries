/* eslint-disable react/prop-types */
const ActivityCard = ({ activity }) => {
  const { name, difficulty, duration, season, Countries } = activity;
  
  return (
    <div>
      <h4>{name}</h4>
      <h5>Difficulty: {difficulty}</h5>
      <h5>Duration: {duration}</h5>
      <h5>Season: {season}</h5>
      <h5>Countries:</h5>
      <ul>
        {Countries?.map((country, index) => (
          <li key={index}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityCard;
