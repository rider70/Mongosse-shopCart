const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  },
  status: {
    type: String,
    required: true,
    default: "PENDING",

  },
  product: {
    type: mongoose.Types.ObjectId,
    required: true,
    
  },
  cantidad: {
    type: Number,
    required: true,
    
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
