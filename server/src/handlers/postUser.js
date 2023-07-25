const postUserController = require("../controllers/postUser");

const postUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Missing user data");

    const [newUser, created] = await postUserController(email, password);
    if (!created) throw new Error("The user already exists");

    return res.json(newUser);
  } catch (error) {
    switch (error.message) {
      case "Missing user data":
        return res.status(400).send(error.message);
      case "The user already exists":
        return res.status(409).send(error.message);
      default:
        return res.status(500).send(error.message);
    }
  }
};

module.exports = postUserHandler;
