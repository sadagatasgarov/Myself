const express = require("express");
const { register, getUser, login, logout, imageUpload, forgotpassword, resetpassword, editDetails} = require("../controller/auth");
const { getAccesToRoute } = require("../middlewares/authorization/auth");
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");

const router = express.Router();
router.post("/forgotpassword",forgotpassword);
router.post("/register", register);
router.get("/profile", getAccesToRoute, getUser);
router.post("/login", login);
router.get("/logout", getAccesToRoute, logout);
router.put("/edit",getAccesToRoute,editDetails)
router.put("/resetpassword",resetpassword);
router.post(
  "/upload",
  [getAccesToRoute, profileImageUpload.single("profile_image")],
  imageUpload
);




module.exports = router;
