const mongoose = require("mongoose");
const stockMovementSchema = new mongoose.Schema({
  productId: String,
  change: Number,
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("StockMovement", stockMovementSchema);