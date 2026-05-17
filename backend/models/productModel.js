const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  stock: Number,
  price: Number,
  supplierId: String
});


module.exports = mongoose.model("Product", productSchema);