const { Op } = require("sequelize");
const { Country } = require("../db");

const getCountryByNameController = async (name) => {
  return await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}`,
      },
    },
  });
};

module.exports = getCountryByNameController;
