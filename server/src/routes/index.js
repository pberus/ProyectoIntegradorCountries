const router = require("express").Router();

const countries = require("./countries")

router.use("/countries", countries)

module.exports = router;