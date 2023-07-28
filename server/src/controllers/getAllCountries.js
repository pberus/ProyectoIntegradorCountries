const { Country, Activity } = require("../db");

const getAllCountriesController = async () => {
  return await Country.findAll({
    attributes: ["ID", "flag", "name", "continents", "population"],
    include: {
      model: Activity,
      attributes: ["season"],
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = getAllCountriesController;
