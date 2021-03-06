
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const Question = require("../models/question");
const Answer = require("../models/answer");

const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { question_id } = req.params;
  const user_id = req.user.id;
  const information = req.body;

  const answer = await Answer.create({
    ...information,
    question: question_id,
    user: user_id,
  });

  return res.status(200).json({
    success: true,
  });
});

const getAllAnswers = asyncErrorWrapper(async (req, res, next) => {
  const { question_id } = req.params;
  const question = await Question.findById(question_id).populate("answers");

  const answers = question.answers;

  return res.status(200).json({
    success: true,
    count: answers.length,
    data: answers,
  });
});
const getSingleAnswer = asyncErrorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const answer = await Answer.findById(answer_id)
    .populate({
      path:"question",
      select:"title"
    })
    .populate({
      path:"user",
      select:"name profile_image"
    })

  return res.status(200).json({
    success: true,
    data: answer,
  });
});


const editAnswer = asyncErrorWrapper(async (req, res, next) => {
const {answer_id} = req.params;
let answer = await Answer.findById(answer_id);
const {content} = req.body;
answer.content = content
answer.save();

res.status(200)
.json({
  success:true,
  data:answer
})
});

const deleteAnswer = asyncErrorWrapper(async (req, res, next) => {
  const {answer_id} = req.params;
  const {question_id} = req.params;
  await Answer.findByIdAndRemove(answer_id);
const question =await Question.findById(question_id);
question.answers.splice(question.answers.indexOf(answer_id),1);
await question.save();
  res.status(200)
  .json({
    success:true,
    data:"sucessfully answer deleted"
  })
  
});
module.exports = { addNewAnswerToQuestion, getAllAnswers, getSingleAnswer, editAnswer, deleteAnswer };
