const express = require("express");

const question = require("./questions");
const auth = require("./auth");
const user = require("./users");
const admins = require("./admins");

const router = express.Router();
router.use("/questions", question);
router.use("/auth", auth);
router.use("/users", user);
router.use("/admins",admins);
module.exports = router;
