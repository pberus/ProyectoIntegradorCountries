const router = require("express").Router();

const countries = require("./countries")
const activities = require("./activities")
const users = require("./users")

router.use("/countries", countries)
router.use("/activities", activities)
router.use("/login", users)

module.exports = router;