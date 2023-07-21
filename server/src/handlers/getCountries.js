const getCountriesController = require("../controllers/getCountries");
const { Country } = require("../db");

const getCountriesHandler = async () => {
  try {
    const countries = await getCountriesController();
    const countriesToInsert = countries?.map(
      ({
        cca3,
        name,
        flags,
        continents,
        capital,
        subregion,
        area,
        population,
      }) => ({
        ID: cca3,
        name: name.common,
        flags: flags.png,
        continents,
        capital,
        subregion,
        area,
        population,
      })
    );
    console.log(countriesToInsert);
    return await Country.bulkCreate(countriesToInsert);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getCountriesHandler;
