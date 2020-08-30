const express = require("express");

const question = require("./questions");
const auth = require("./auth");

const router = express.Router();
router.use("/questions", question);
router.use("/auth", auth);

module.exports = router;
