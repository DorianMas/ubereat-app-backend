const mongoose = require("mongoose");

const Order = mongoose.model("Order", {
  restaurant: String,
  dishes: [],
  price: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: { type: Date, default: Date.now() },
});

module.exports = Order;
