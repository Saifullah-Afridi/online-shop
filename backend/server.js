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

const dbConnect = require("./config/dataBaseConnect");
dbConnect();

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
