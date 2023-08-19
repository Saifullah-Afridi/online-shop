const mongoose = require("mongoose"); // Erase if already required
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name for user"],
    maxlength: [15, "name should be greater then 15 characters"],
    minlength: [4, "name should not be less then 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide email for user"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password for user"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide confirm your passoword"],

    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "The passwords does not match",
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: String,
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.generatePasswordResetToken = function () {
  const restString = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(restString)
    .digest("hex");
  this.resetPasswordTokenExpire = Date.now * 15 * 60 * 1000;
  return restString;
};
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Export the model
module.exports = mongoose.model("User", userSchema);
