const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const AppError = require("../utils/AppError");

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderedItems,
    paymentInfo,
    taxPrice,
    productPrice,
    shippingPrice,
    totelPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderedItems,
    paymentInfo,
    taxPrice,
    productPrice,
    shippingPrice,
    totelPrice,
    user: req.user._id,
    paidAt: Date.now(),
  });
  res.status(201).json({
    status: "success",
    order,
  });
});

exports.myOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user.id,
  }).populate("user", "name email");

  if (!orders) {
    return next(new AppError("No order is found"));
  }
  res.status(200).json({
    status: "sccuss",
    orders,
  });
});
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new AppError("No order is found"));
  }
  res.status(200).json({
    status: "sccuss",
    order,
  });
});

// for admin
exports.getAllOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");

  let totelAmount = 0;
  orders.forEach((order) => {
    totelAmount = totelAmount + order.totelPrice;
  });
  res.status(200).json({
    status: "sccuss",
    totelAmount,
    orders,
  });
});

// admin
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError("No order is found"));
  }
  if (order.orderStatus === "delivered") {
    return next(new AppError("you have already delivered this product"));
  }
  order.orderdItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });
  order.orderStatus = req.body.orderStatus;
  if (req.body.orderStatus === "delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    message: "order has been updated",
    status: "sccuss",
  });
});

//admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const deletedOrder = await Order.findById(req.params.id);
  if (!deletedOrder) {
    return next(new AppError("No order is found"));
  }
  await deletedOrder.remove();
  res.status(200).json({
    status: "sccuss",
    message: "order has been deleted",
  });
});
