const express = require("express");
const User = require("../models/user")
const { getSingleUser, getAllUsers } = require("../controller/user");
const {checkUserExist} = require("../middlewares/database/databaseErrorHelpers");
const userQueryMiddleware = require("../middlewares/query/userQueryMiddleware");
const router = express.Router();

router.get("/:id", checkUserExist, getSingleUser);
router.get("/",userQueryMiddleware(User), getAllUsers);
module.exports = router;
