const getApiController = require("../controllers/getApi");
const { Country } = require("../db");

const getApiHandler = async () => {
  try {
    const countries = await getApiController();
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
        flag: flags.png,
        continents,
        capital,
        subregion,
        area,
        population,
      })
    );
    return await Country.bulkCreate(countriesToInsert);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getApiHandler;
