const Order = require("../models/Order");


// CREATE ORDER
const createOrder = async (req, res) => {

  try {

    const {
      orderItems,
      totalPrice,
    } = req.body;


    const order =
      await Order.create({

        user: req.user._id,

        orderItems,

        totalPrice,
      });


    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// GET USER ORDERS
const getMyOrders = async (req, res) => {

  try {

    const orders =
      await Order.find({
        user: req.user._id,
      });

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// CANCEL ORDER
const cancelOrder = async (req, res) => {

  try {

    // FIND ORDER
    const order =
      await Order.findById(req.params.id);


    // ORDER NOT FOUND
    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });
    }


    // CHECK OWNER
    if (
      order.user.toString() !==
      req.user._id.toString()
    ) {

      return res.status(401).json({
        message: "Not authorized",
      });
    }


    // DELETE ORDER
    await order.deleteOne();


    res.status(200).json({
      message: "Order cancelled",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// EXPORTS
module.exports = {
  createOrder,
  getMyOrders,
  cancelOrder,
};