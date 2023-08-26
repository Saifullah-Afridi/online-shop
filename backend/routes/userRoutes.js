const express = require("express");
const {
  signUp,
  login,
  logOut,
  forgotPassword,
  resetPassword,
  userDetail,
  protected,
  updatePassword,
  restrictedToAdmin,
} = require("../controllers/authControllers");
const {
  getAllUsers,
  getSingleUser,
  deleteUser,
} = require("../controllers/userControllers");
const router = express.Router();
router.route("/").get(protected, restrictedToAdmin, getAllUsers);
router.route("/").patch(protected, restrictedToAdmin, updatePassword);
router.route("/").delete(protected, restrictedToAdmin, deleteUser);
router.get("/logout", logOut);
router.route("/signin").post(signUp);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:token").patch(resetPassword);
router.route("/me").get(protected, userDetail);
router.route("/updatepassword").patch(protected, updatePassword);
router.route("/:id").get(protected, restrictedToAdmin, getSingleUser);

module.exports = router;
