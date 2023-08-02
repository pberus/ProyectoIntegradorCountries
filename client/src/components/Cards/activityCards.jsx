import ActivityCard from "../Card/activityCard";

/* eslint-disable react/prop-types */
const ActivityCards = ({ activities }) => {
  return (
    <div>
      <h2>These are the activities created so far:</h2>
      {activities?.map((activity) => {
        return <ActivityCard key={activity.ID} activity={activity} />;
      })}
    </div>
  );
};

export default ActivityCards;
