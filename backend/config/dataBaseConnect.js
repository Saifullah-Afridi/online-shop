const mongoose = require("mongoose");

dataBaseConnect = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database connected successfully");
    });

  mongoose.set("strictQuery", true);
};

module.exports = dataBaseConnect;
