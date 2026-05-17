const Product = require("../models/productModel");
const Supplier = require("../models/supplierModel");
const getSuppliers = async (req, res) => {
    try {
        const data = await Supplier.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching suppliers" });
    }
};

const addSupplier = async (req, res) => {
    try {
        const { name } = req.body; 
        const trimmedName = name?.trim();
        if (!name || trimmedName === "") {
            return res.status(400).json({ message: "Name required" });
        }
        const exists = await Supplier.findOne({name: { $regex: new RegExp(`^${trimmedName}$`, "i") }});
        if (exists) {
            return res.status(400).json({ message: "Supplier already exists" });
        }
        const supplier = await Supplier.create({
            name: trimmedName
        });
        res.json(supplier);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Error adding supplier" });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const isUsed = await Product.findOne({ supplierId: id });
        if (isUsed) {
            return res.status(400).json({ message: "Supplier is used in products" });
        }
        const deleted = await Supplier.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Supplier not found" });
        }
    res.json({ message: "Supplier deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting supplier" });
    }
};
module.exports = {getSuppliers, addSupplier, deleteSupplier};