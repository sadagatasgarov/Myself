const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;
const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please oravide title"],
    minlength: [10, "please provide title at least 10 caracter"],
    unique: true,
  },

  content: {
    type: String,
    required: [true, "please provide content"],
    minlength: [10, "please provide title at least 10 caracter"],
  },
  slug: String,
  createtAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  answers:[
    {
      type: mongoose.Schema.ObjectId,
      ref:"Answers"
    }
  ]
});

questionSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});

questionSchema.methods.makeSlug = function () {
  console.log(this.title);
  return slugify(this.title, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    // strict: false,     // strip special characters except replacement, defaults to `false`
    //  locale: 'vi'       // language code of the locale to use
  });
};

module.exports = mongoose.model("Question", questionSchema);
