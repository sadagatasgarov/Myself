const mongoose = require("mongoose");
const { likeQuestion } = require("../controller/question");
const Question = require("./question");

const Schema = mongoose.Schema;
const answerSchema = new Schema({
  content: {
    type: String,
    required: [true, "please provide a content"],
    minlength: [10, "please provide a content at least 10 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
    required: true,
  },
});

answerSchema.pre("save", async function (next) {
  if (!this.isModified("user")) return next();
  try {
    const question = await Question.findById(this.question);
    question.answers.push(this._id);

    await question.save();
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("Answer", answerSchema);
