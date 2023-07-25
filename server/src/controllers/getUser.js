const { Op } = require("sequelize");
const { User } = require("../db");

const getUserController = async (email) => {
  return await User.findOne({
    where: {
      email: {
        [Op.iLike]: `%${email}`,
      },
    },
  });
};

module.exports = getUserController;
