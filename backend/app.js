const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodParser = require("body-parser");
const morgan = require("morgan");
app.use(express.json());
app.use(cookieParser());
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(fileUpload());
app.use(bodParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
//routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/orders", orderRoutes);
app.all("*", (req, res, next) => {
  next(new AppError(`can not find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
