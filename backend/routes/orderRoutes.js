const express = require("express");
const {
  createOrder,

  myOrder,
  getSingleOrder,
  getAllOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderControllers");
const {
  protected,
  restrictedToAdmin,
} = require("../controllers/authControllers");
const router = express.Router();

router.route("/").get(protected, restrictedToAdmin, getAllOrder);
router.route("/").post(protected, createOrder);
router.route("/myorders").get(protected, myOrder);
router
  .route("/adminorder/:id")
  .get(protected, restrictedToAdmin, getSingleOrder);
router
  .route("/adminorder/:id")
  .patch(protected, restrictedToAdmin, updateOrderStatus);
router
  .route("/adminorder/:id")
  .delete(protected, restrictedToAdmin, deleteOrder);

module.exports = router;
