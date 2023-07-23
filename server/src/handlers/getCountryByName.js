const getCountryByNameController = require("../controllers/getCountryByName");

const getCountryByNameHandler = async (req, res) => {
  try {
    const {name} = req.query;
    if (!name) throw new Error ("Please provide a country name")

    const country = await getCountryByNameController(name);
    if (!country) throw new Error(`There is no country with the name: ${name}`);

    return res.json(country);
  } catch (error) {
    console.log(error.message);

    return error.message.includes("name")
      ? res.status(404).send(error.message)
      : res.status(500).send(error.message);
  }
};

module.exports = getCountryByNameHandler;
