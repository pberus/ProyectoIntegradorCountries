const getUserController = require("../controllers/getUser");

const getUserHandler = async (req, res) => {
  try {
    const { email, password } = req.query;
    if (!email || !password) throw new Error("Missing user data");

    const userFound = await getUserController(email);
    if (!userFound) throw new Error("User not found");

    if (userFound.password !== password) throw new Error("Incorrect password");

    return res.json({ access: true });
  } catch (error) {
    switch (error.message) {
      case "Missing user data":
        return res.status(400).send(error.message);
      case "User not found":
        return res.status(404).send(error.message);
      case "Incorrect password":
        return res.status(403).send(error.message);
      default:
        return res.status(500).send(error.message);
    }
  }
};

module.exports = getUserHandler;
