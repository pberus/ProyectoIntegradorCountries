const postActivityController = require("../controllers/postActivity");

const regexNotNumbers = /^[^\d]+$/;
const regexNumbers = /^[0-9]+$/;

const postActivityHandler = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countriesId } = req.body;

    if (!name || !difficulty || !duration || !season) {
      throw new Error("Missing data");
    }

    if (
      !regexNotNumbers.test(name) ||
      name.length > 20 ||
      !regexNumbers.test(duration) ||
      Number(duration) > 24
    )
      throw new Error("Does not meet all the requirements");

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
