const { Activity, Country } = require("../db");

const postActivityController = async (
  name,
  difficulty,
  duration,
  season,
  countriesId
) => {
  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });

  const countries = await Country.findAll({
    where: {
      ID: countriesId,
    },
  });

  if (countries.length !== countriesId.length) {
    throw new Error("No countries found, some ID is wrong");
  }

  await newActivity.addCountries(countries);

  //! Si quiero devolver la actividad sin el ID o incluido los paises, hacer un findAll a Activity y devolver el resultado. 
  //! Si no quiero crear una actividad que ya esta creada, analizar findOrCreate (revisar borrador)
  return newActivity;
};

module.exports = postActivityController;
