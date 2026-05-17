const mongoose = require("mongoose");
const Product = require("../models/productModel");
const StockMovement = require("../models/stockMovementModel");

const getStockHistory = async (req, res) => {
     try {
        const  id  = req.params.id;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        const productExists = await Product.findById(id);
        if (!productExists) {
            return res.status(404).json({ message: "Product not found" });
        }
        const data = await StockMovement.find({productId: id}).sort({ date: 1 });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching history" });
    }
};
module.exports = {getStockHistory};