const routerUsers = require("express").Router();
const getUserHandler = require("../handlers/getUser");
const postUserHandler = require("../handlers/postUser");

routerUsers.get("/", getUserHandler);
routerUsers.post("/", postUserHandler);

module.exports = routerUsers;
