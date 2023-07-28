const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

const getCountryByNameController = async (name) => {
  return await Country.findOne({
    where: {
      name: {
        [Op.iLike]: `%${name}`,
      },
    },
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

module.exports = getCountryByNameController;
