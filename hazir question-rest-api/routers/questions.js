const express = require("express");
const answer = require("./answers");
const Question = require("../models/question");
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

const questionQueryMiddleware = require("../middlewares/query/questionQueryMiddleware");
const answerQueryMiddleware = require("../middlewares/query/answerQueryMiddleware");
const router = express.Router();

router.post("/ask", getAccesToRoute, askNewQuestion);
router.get(
  "/",
  questionQueryMiddleware(Question, {
    population: {
      path: "user",
      select: "name profil_image",
    },
  }),
  getAllQuestions
);
router.get(
  "/:id",
  [
    checkQuestionExist,
    answerQueryMiddleware(Question, {
      population: [
        {
          path: "user",
          select: "name profile_image",
        },
        {
          path: "answers",
          select: "content",
        },
      ],
    }),
  ],
  getSingleQuestion
);
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
