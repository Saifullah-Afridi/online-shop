const dotenv = require("dotenv");
//uncaught exception
// process.on("uncaughtException", (err) => {
//   console.log("Uncaught Exception Shutting down")`;
//   console.log(err.name);
//   console.log(err.message);
//   process.exit(1);
// });
const app = require("./app");
dotenv.config({ path: "./config/config.env" });
const cloudinary = require("cloudinary");

const dbConnect = require("./config/dataBaseConnect");
dbConnect();

cloudinary.config({
  cloud_name: process.env.CLOULD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const PORT = 3000;

const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`the server is listening on port ${process.env.PORT}`);
});

//handling uncaught promise rejection
process.on("unhandledRejection", (err) => {
  console.log("unhandled Rejection shutting down");
  console.log(err.name);
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});
