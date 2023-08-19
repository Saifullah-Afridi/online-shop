const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const generateJWT = require("../config/genarateJWT");
const createSendToken = require("../utils/createSendToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("../middleware/sendEmail");
const crypto = require("crypto");
exports.signUp = catchAsyncError(async (req, res, next) => {
  const { email, password, passwordConfirm, name } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      avatar: {
        url: "this is sample url",
        public_id: "this sample id",
      },
    });

    createSendToken(newUser, 200, res);
  } else {
    return next(new AppError("this user already exist", 401));
  }
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please provide email and passoword", 401));
  }
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("please provide correct password and email"));
  }

  createSendToken(user, 200, res);
});

exports.logOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    message: "you are logout",
  });
});
exports.protected = catchAsyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return next(new AppError("please login to access this page.", 401));
  }

  const payload = jwt.verify(token, process.env.SECRET_KEY);
  const currentUser = await User.findOne({ _id: payload.id });

  if (!currentUser) {
    return next(
      new AppError(
        "the user belong to this token does not exist please login and try later",
        401
      )
    );
  }
  req.user = currentUser;
  next();
});

exports.restrictedToAdmin = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return next(
      new AppError("you are not allowed to perform this action "),
      403
    );
  }
  next();
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("this user does not exist"));
  }

  const resetToken = user.generatePasswordResetToken();
  //saving the user because we modified the user
  await user.save({ validateBeforeSave: false });
  //the option in save is must
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecomerce password recovery",
      message,
    });

    res.status(200).json({
      status: "success",
      message: `email send to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    user.save({ validateBeforeSave: false });
    return next(new AppError(err.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const hasedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hasedToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("the token is invalid or has been expired"));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save();
  createSendToken(user, 200, res);
});

// for login user
exports.userDetail = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!(await user.comparePassword(req.body.oldPassword))) {
    return next(
      new AppError(
        "the current password is wrong please provide the correct password"
      )
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, 200, res);
});

exports.updateMe = catchAsyncError(async (req, res, next) => {
  if (req.body.passsword || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for chaning password or passwordConfirm",
        400
      )
    );
  }

  //must be very carefull,will not allow clients to change role,token or other fields
  //only allow to change specific fields

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    message: "Your profile has been updated",
    updatedUser,
  });
});
