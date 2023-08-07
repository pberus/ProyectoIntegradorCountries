const getAllCountriesHandler = require("../handlers/getAllCountries");
const getCountryByIdHandler = require("../handlers/getCountryById");
const getCountryByNameHandler = require("../handlers/getCountryByName");
const getCountryMaxPopulationHandler = require("../handlers/getCountryMaxPopulation");

const routerCountries = require("express").Router();

routerCountries.get("/", getAllCountriesHandler);
routerCountries.get("/name", getCountryByNameHandler);
routerCountries.get("/:idPais", getCountryByIdHandler);
//routerCountries.get("/maxpopulation", getCountryMaxPopulationHandler)


module.exports = routerCountries;

