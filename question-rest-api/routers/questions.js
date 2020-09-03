const express = require("express");
const answer = require("./answers");

const {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
} = require("../controller/question");
const {
  getAccesToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/authorization/auth");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHelpers");
//const { route } = require("./answers");

const router = express.Router();

router.post("/ask", getAccesToRoute, askNewQuestion);
router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExist, getSingleQuestion);
router.put(
  "/:id/edit",
  [getAccesToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);
router.delete(
  "/:id/delete",
  [getAccesToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
);
router.get("/:id/like", [getAccesToRoute, checkQuestionExist], likeQuestion);
router.get(
  "/:id/undo_like",
  [getAccesToRoute, checkQuestionExist],
  undoLikeQuestion
);
/* router.get("/delete", (req, res) => {
  res
  .status(404)
  .send("<h1>Question delete page<h1> <br>ozumuz yazdiq 404")
}); */

router.use("/:question_id/answer", checkQuestionExist, answer);

module.exports = router;
