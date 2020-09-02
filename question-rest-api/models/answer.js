const mongoose = require("mongoose");
const { likeQuestion } = require("../controller/question");
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

module.exports = mongoose.model("Answer", answerSchema);
