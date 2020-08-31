const express = require("express");
const { getSingleUser, getAllUsers } = require("../controller/user");
const checkUserExist = require("../middlewares/database/databaseErrorHelpers");

const router = express.Router();

router.get("/:id", checkUserExist, getSingleUser);
router.get("/",getAllUsers);
module.exports = router;
