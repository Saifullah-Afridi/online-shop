const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");
const AppError = require("../utils/AppError");

exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    product,
  });
});

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  //filtering
  const queryObj = { ...req.query };
  const excludedField = ["page", "sort", "fields", "limit"];
  excludedField.forEach((el) => delete queryObj[el]);

  // const products = await Product.find(queryObj);
  //buidling a query which will return a query

  // advance filtering includeing operator including gte lt lte gte

  console.log(req.query);
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  queryString = JSON.parse(queryString);

  let query = Product.find(queryString);
  //*****************************sorting****************************
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    console.log(sortBy);
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //limiting fiedls

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  //pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 100;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numOfProducts = await Product.countDocuments();
    if (skip >= numOfProducts) {
      return next(new AppError("this page does not exist", 404));
    }
  }
  //executing query
  const products = await query;
  res.status(200).json({
    results: products.length,
    status: "success",
    products,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("the product with this id is not found", 404));
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    updatedProduct,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("the product with this id is not found", 404));
  }

  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    deletedProduct,
  });
});

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate({
      path: "user",
      select: "name avatar",
    })
    .populate("reviews");
  if (!product) {
    return next(new AppError("the product with this id is not found", 404));
  }
  res.status(200).json({
    status: "success",
    product,
  });
});
