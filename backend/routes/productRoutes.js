const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  getSingleProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const {
  protected,
  restrictedToAdmin,
} = require("../controllers/authControllers");

// router.route("/").get(getAllProducts).post(createProduct);
router
  .route("/")
  .get(getAllProducts)
  .post(protected, restrictedToAdmin, createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(protected, restrictedToAdmin, updateProduct)
  .delete(protected, restrictedToAdmin, deleteProduct);

module.exports = router;
