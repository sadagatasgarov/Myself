const express = require("express");
const Question = require("../models/question");


const {checkQuestionAndAnswerExist} = require("../middlewares/database/databaseErrorHelpers")
const { addNewAnswerToQuestion, getAllAnswers, getSingleAnswer,editAnswer, deleteAnswer } = require("../controller/answer");
const { getAccesToRoute } = require("../middlewares/authorization/auth");
const {getAnswerOwnerAccess} = require("../middlewares/authorization/auth")


const router = express.Router({ mergeParams: true });

router.post("/", getAccesToRoute, addNewAnswerToQuestion);

router.get("/",getAllAnswers)
router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer);
router.put("/:answer_id/edit",[checkQuestionAndAnswerExist,getAccesToRoute,getAnswerOwnerAccess],editAnswer)
router.delete("/:answer_id/delete",[checkQuestionAndAnswerExist,getAccesToRoute,getAnswerOwnerAccess],deleteAnswer)
module.exports = router;
