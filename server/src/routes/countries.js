const getAllCountriesHandler = require("../handlers/getAllCountries");
const getCountryByIdHandler = require("../handlers/getCountryById");
const getCountryByNameHandler = require("../handlers/getCountryByName");
const getCountryMaxPopulationHandler = require("../handlers/getCountryMaxPopulation");

const routerCountries = require("express").Router();

//routerCountries.get("/maxpopulation", getCountryMaxPopulationHandler)
routerCountries.get("/", getAllCountriesHandler);
routerCountries.get("/name", getCountryByNameHandler);
routerCountries.get("/:idPais", getCountryByIdHandler);


module.exports = routerCountries;

