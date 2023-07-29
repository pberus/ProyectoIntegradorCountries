const { Country, Activity } = require("../db");

const getAllCountriesController = async () => {
  return await Country.findAll({
    include: {
      model: Activity,
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = getAllCountriesController;
