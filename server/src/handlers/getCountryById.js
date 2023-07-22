const getCountryByIdController = require("../controllers/getCountryById");

const getCountryByIdHandler = async (req, res) => {
  try {
    const { idPais } = req.params;
    const country = await getCountryByIdController(idPais);

    if (!country) throw new Error(`There is no country with the ID: ${idPais}`);

    return res.json(country);
  } catch (error) {
    console.log(error.message);

    return error.message.includes("ID")
      ? res.status(404).send(error.message)
      : res.status(500).send(error.message);
  }
};

module.exports = getCountryByIdHandler;