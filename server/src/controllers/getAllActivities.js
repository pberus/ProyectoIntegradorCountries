const { Activity, Country } = require("../db");

const getAllActivitiesController = async () => {
  return await Activity.findAll({
    attributes: ["name", "difficulty", "duration", "season"],
    include: [
      {
        model: Country,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });
};

module.exports = getAllActivitiesController;
