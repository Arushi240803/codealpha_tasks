const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  cancelOrder,
} = require("../controllers/orderController");

const {
  protect,
} = require("../middleware/authMiddleware");


// CREATE ORDER
router.post(
  "/",
  protect,
  createOrder
);


// GET MY ORDERS
router.get(
  "/myorders",
  protect,
  getMyOrders
);


// CANCEL ORDER
router.delete(
  "/:id",
  protect,
  cancelOrder
);


module.exports = router;