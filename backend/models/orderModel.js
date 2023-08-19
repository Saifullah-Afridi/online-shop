const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  orderdItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    requied: true,
  },
  productPrice: {
    type: Number,
    defualt: 0,
    required: true,
  },
  //below will be calcluated in frontend
  taxPrice: {
    type: Number,
    defualt: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    defualt: 0,
    required: true,
  },
  totelPrice: {
    type: Number,
    defualt: 0,
    required: true,
  },

  orderStatus: {
    type: String,
    default: "processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    defualt: Date.now(),
  },
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
