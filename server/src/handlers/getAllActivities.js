const getAllActivitiesController = require("../controllers/getAllActivities");

const getAllActivitiesHandler = async (req, res) => {
  try {
    const activities = await getAllActivitiesController();
    return res.json(activities);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

module.exports = getAllActivitiesHandler;
