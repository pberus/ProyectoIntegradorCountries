const postActivityController = require("../controllers/postActivity");

const postActivityHandler = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countriesId } = req.body;

    if (!name || !difficulty || !duration || !season) {
      throw new Error("Missing data");
    }

    const activity = await postActivityController(
      name,
      difficulty,
      duration,
      season,
      countriesId
    );
    
    return res.json(activity);
  } catch (error) {
    error instanceof Error
      ? res.status(404).send(error.message)
      : res.status(500).send(error.message);
  }
};

module.exports = postActivityHandler;
