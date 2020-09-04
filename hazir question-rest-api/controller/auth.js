const User = require("../models/user");
//const customErrorHandler = require("../middlewares/error/customErrorHandler");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/input/inputHelpers");
const sendEmail = require("../helpers/libraries/sendEmail");
const register = asyncErrorWrapper(async (req, res, next) => {
  /* const name = "Sexavet Asgarov";
  const email = "sexavet.esgerov@gmail.com";
  const password = "123456"; */
  //try catch
  //console.log(req.body);

  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendJwtToClient(user, res);
});

const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  //console.log(email,password);
  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your input", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!comparePassword(password, user.password)) {
    return next(new CustomError("please check your credentials", 400));
  }
  sendJwtToClient(user, res);
});

const editDetails = asyncErrorWrapper(async (req, res, next) => {
  const editInformation = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, editInformation, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: user,
  });
});

const logout = asyncErrorWrapper(async (req, res, next) => {
  const { NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout succesfull",
    });
});

const getUser = (req, res, next) => {
  res.json({
    success: true,
    message: "welcome",
    data: {
      id: req.user.id,
      name: req.user.name,
    },
  });
};

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      profile_image: req.savedProfileImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Image upload succsful",
    data: user,
  });
});

const forgotpassword = asyncErrorWrapper(async (req, res, next) => {
  const resetEmail = req.body.email;

  const user = await User.findOne({ email: resetEmail });
  if (!user) {
    return next(new CustomError("There is no user with that email"));
  }
  const resetPasswordToken = user.getResetPasswordTokenFromUser();

  await user.save();
  const resetPasswordURL = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;
  const emailTemplate = `
 <h3>hghghgh</h3>
 <p> This is <a href ='${resetPasswordURL}', target = '_blank'>link</a> will expire in 1 hour</p>
 `;
  try {
    await sendEmail({
      from: process.env.SMTP_USER,
      to: resetEmail,
      subject: "Reset Your Password",
      html: emailTemplate,
    });
    return res.status(200).json({
      status: true,
      message: "Token sent to your email",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new CustomError("Email could not be sent", 500));
  }
});

const resetpassword = asyncErrorWrapper(async (req, res, next) => {
  const { resetPasswordToken } = req.query;
  const { password } = req.body;
  if (!resetPasswordToken) {
    return next(
      new CustomError("Wrong token or timeout, Please provide true token"),
      401
    );
  }
  let user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new CustomError("Invalid token or Session Expired", 404));
  }

  user.password = password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return res.status(200).json({
    status: true,
    message: "Reset password succesfull",
  });
});

module.exports = {
  register,
  login,
  getUser,
  logout,
  imageUpload,
  forgotpassword,
  resetpassword,
  editDetails,
};
