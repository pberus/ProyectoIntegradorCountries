const { Activity, Country } = require("../db");

const postActivityController = async (
  name,
  difficulty,
  duration,
  season,
  countriesId
) => {
  const [newActivity, created] = await Activity.findOrCreate({
    where: {
      name,
      difficulty,
      duration,
      season,
    },
  });

  if (!created) throw new Error("The activity already exists");

  const countries = await Country.findAll({
    where: {
      ID: countriesId,
    },
  });

  if (countries.length !== countriesId.length) {
    throw new Error("No countries found, some ID is wrong");
  }

  await newActivity.addCountries(countries);

  return await Activity.findByPk(newActivity.ID, {
    include: {
      model: Country,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = postActivityController;
