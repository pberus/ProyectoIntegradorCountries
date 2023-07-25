const { Op } = require("sequelize");
const { User } = require("../db");

const postUserController = async (email, password) => {
  return await User.findOrCreate({
    where: { email, password },
  });
};

module.exports = postUserController;
