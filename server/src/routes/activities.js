const getAllActivitiesHandler = require("../handlers/getAllActivities");
const postActivityHandler = require("../handlers/postActivity");

const routerActivities = require("express").Router();

routerActivities.post("/", postActivityHandler);
routerActivities.get("/", getAllActivitiesHandler);

module.exports = routerActivities;
