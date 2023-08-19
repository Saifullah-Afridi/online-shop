const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    users,
  });
});

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const users = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("User does found with this id", 404));
  }
  await res.status(200).json({
    status: "success",
    users,
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    return next(new AppError("User does found with this id", 404));
  }
  await res.status(200).json({
    status: "success",
    message: "user has been deleted",
    deletedUser,
  });
});
exports.updateUser = catchAsyncError(async (req, res, next) => {
  const updatedUser = await User.findByIdAndD(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    return next(new AppError("User does found with this id", 404));
  }
  await res.status(200).json({
    status: "success",
    message: "user has been updated",
    updatedUser,
  });
});
