const express = require("express");

const { getAllQuestions } = require("../controller/question");

const router = express.Router();

router.get("/", getAllQuestions);

/* router.get("/delete", (req, res) => {
  res
  .status(404)
  .send("<h1>Question delete page<h1> <br>ozumuz yazdiq 404")
}); */

module.exports = router;
