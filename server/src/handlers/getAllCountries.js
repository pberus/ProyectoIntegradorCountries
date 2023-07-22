const getAllCountriesController = require("../controllers/getAllCountries");

const getAllCountriesHandler = async (req, res) => {
  try {
    const countries = await getAllCountriesController();
    return res.json(countries);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

module.exports = getAllCountriesHandler;