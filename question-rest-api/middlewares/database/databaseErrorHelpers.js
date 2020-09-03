const User = require("../../models/user");
const Question = require("../../models/question");
const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const Answer = require("../../models/answer");
const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return next(new CustomError("There is no such user with this id", 400));
  }
  next();
});

const checkQuestionExist = asyncErrorWrapper(async (req, res, next) => {
  const question_id = req.params.id || req.params.question_id;
  // const {id} = req.params||req.params.question_id

  const question = await Question.findById(question_id); //id
  if (!question) {
    return next(new CustomError("There is no such question with this id", 400));
  }
  next();
});


const checkQuestionAndAnswerExist = asyncErrorWrapper(async (req, res, next) => {
  const question_id = req.params.question_id;
  // const {id} = req.params||req.params.question_id
  const answer_id = req.params.answer_id;
  const answer = await Answer.findOne({
   _id: answer_id,
   question: question_id

  }); //id
  if (!answer) {
    return next(new CustomError("There is no answer wit that id associated with that question_id", 400));
  }
  next();
});

module.exports = { checkUserExist, checkQuestionExist,checkQuestionAndAnswerExist };
