const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "books",
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out for Delivery", "Delivered", "Cancelled"]
    },
  },
  { timestamps: true }   // it helps in sorting of books 
);

module.exports = mongoose.model("order", orderSchema);