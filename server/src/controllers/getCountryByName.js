const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

const getCountryByNameController = async (name) => {
  return await Country.findOne({
    where: {
      name: {
        [Op.iLike]: `${name}%`,
      },
    },
    include: {
      model: Activity,
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = getCountryByNameController;
