const axios = require("axios");

const getCountriesController = async () => {
  const { data } = await axios("http://localhost:5000/countries");
  return data;
};

module.exports = getCountriesController;
