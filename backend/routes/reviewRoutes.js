const express = require("express");
const {
  createReview,
  getllAllReview,
} = require("../controllers/reviewControllers");
const { protected } = require("../controllers/authControllers");
const router = express.Router();

// router.route("/").get(getAllProducts).post(createProduct);
router.route("/").post(protected, createReview).get(getllAllReview);

module.exports = router;
