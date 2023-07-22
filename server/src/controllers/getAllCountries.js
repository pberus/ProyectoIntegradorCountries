const { Country } = require("../db");

const getAllCountriesController = async () => {
  return await Country.findAll();
};

module.exports = getAllCountriesController;
