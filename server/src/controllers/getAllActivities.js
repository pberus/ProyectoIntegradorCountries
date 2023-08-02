const { Activity, Country } = require("../db");

const getAllActivitiesController = async () => {
  return await Activity.findAll({
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
