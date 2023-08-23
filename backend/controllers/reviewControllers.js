const catchAsyncError = require("../middleware/catchAsyncError");
const Review = require("../models/reviewModel");

exports.createReview = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;
  req.body.name = req.user.name;

  const review = await Review.create(req.body);
  res.status(200).json({
    status: "success",
    review,
  });
});

exports.getllAllReview = catchAsyncError(async (req, res, next) => {
  const reviews = await Review.find()
    .populate({
      path: "user",
      select: "name avatar",
    })
    .populate("product");
  res.status(200).json({
    status: "success",
    reviews,
  });
});
