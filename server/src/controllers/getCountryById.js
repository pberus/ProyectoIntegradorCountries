const { Country, Activity } = require("../db");

const getCountryByIdController = async (id) => {
  return await Country.findByPk(id, {
    include: {
      model: Activity,
      through: {
        attritubes: [],
      },
    },
  });
};

module.exports = getCountryByIdController;
