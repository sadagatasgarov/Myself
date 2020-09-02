const Question = require("../models/question");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const askNewQuestion = asyncErrorWrapper(async (req, res, next) => {
  const information = req.body;

  const question = await Question.create({
    ...information,
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    data: question,
  });
});

const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {
  const question = await Question.find();
  
  return res.status(200).json({
    success: true,
    data: question,
  });
});


const getSingleQuestion = asyncErrorWrapper(async (req, res, next) => {
  const {id}= req.params
  const question = await Question.findById(id);
 
  return res.status(200).json({
    success: true,
    data: question,
  });
});


const editQuestion = asyncErrorWrapper(async (req, res, next) => {
  const {id}= req.params;
  const {title, content} = req.body;
  let question =await Question.findById(id);

   question.title = title;
   question.content = content;

   question = await question.save();
 
  return res.status(200).json({
    success: true,
    data: question,
  });
});

const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {
  const {id}= req.params;
  
  await Question.findByIdAndDelete(id);

 
  return res.status(200).json({
    success: true,
    data: "Delete operation successfull",
  });
});
const likeQuestion = asyncErrorWrapper(async (req, res, next) => {
  const {id}= req.params;
  
  const question = await Question.findById(id);
if(question.likes.includes(req.user.id)){
  return next(new CustomError("You already liked this question",401))
}
question.likes.push(req.user.id);

 await question.save();
  return res.status(200).json({
    success: true,
    data: question,
  });
});

const undoLikeQuestion = asyncErrorWrapper(async (req, res, next) => {
  const {id}= req.params;
  
  const question = await Question.findById(id);
if(!question.likes.includes(req.user.id)){
  return next(new CustomError("You cannot undo like operatin for this",400))
}

const index = question.likes.indexOf(req.user.id);
question.likes.splice(index,1);
 await question.save();
  return res.status(200).json({
    success: true,
    data: question,
  });
});
undoLikeQuestion



module.exports = { askNewQuestion, getAllQuestions,
   getSingleQuestion, editQuestion,deleteQuestion,
    likeQuestion, undoLikeQuestion};
