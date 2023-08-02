import ActivityCard from "../Card/activityCard";
import style from "./cards.module.css";

/* eslint-disable react/prop-types */
const ActivityCards = ({ activities }) => {
  return (
    <div>
      <h2>These are the activities created so far:</h2>
      <div className={style.cardsContainer}>
        {activities?.map((activity) => {
        return <ActivityCard key={activity.ID} activity={activity} />;
      })}
      </div>
      
    </div>
  );
};

export default ActivityCards;
