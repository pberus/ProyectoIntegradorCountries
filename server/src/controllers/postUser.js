const { Op } = require("sequelize");
const { User } = require("../db");

const postUserController = async (email, password) => {
  const userFound = await User.findOne({
    where: {
        email : {
            [Op.iLike]: `%${email}`,
        }
    }
  })

if (userFound) throw new Error("This email is already registered!")

const userCreated = await User.create({
    email, 
    password
});

return userCreated.id
};

module.exports = postUserController;
