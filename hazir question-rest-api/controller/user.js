const User = require("../models/user");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const getSingleUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

 return res.status(200).json({
    success: true,
    message: user,
  });
});


const getAllUsers = asyncErrorWrapper(async(req,res,next)=>{
//const allUsers = await User.find();
return res.status(200).json(res.queryResult)


})
module.exports = { getSingleUser, getAllUsers };
