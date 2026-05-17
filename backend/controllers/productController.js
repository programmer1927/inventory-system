const Product = require("../models/productModel");
const Supplier = require("../models/supplierModel");
const StockMovement = require("../models/stockMovementModel");

const getProducts = async (req,res) => {
   try {
        const data = await Product.find();
        res.json(data);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
    }
};

const addProduct = async (req,res) => {
    try {
        const { name, category, stock, price, supplierId } = req.body;
        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Name required" });
        }
        if (!category || category.trim() === "") {
            return res.status(400).json({ message: "Category required" });
        }
        if (stock === undefined || isNaN(stock) || Number(stock) < 0) {
            return res.status(400).json({ message: "Invalid stock" });
        }
        if (price === undefined || isNaN(price) || Number(price) < 0) {
            return res.status(400).json({ message: "Invalid price" });
        }
        if (!supplierId) {
            return res.status(400).json({ message: "Supplier required" });
        }
        const supplierExists = await Supplier.findById(supplierId);
        if (!supplierExists) {
            return res.status(400).json({ message: "Invalid supplier" });
        }
        const exists = await Product.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") }
        });
        if (exists) {
            return res.status(400).json({ message: "Product already exists" });
        }
        const product = await Product.create({
            name: name.trim(),
            category: category.trim(),
            stock: Number(stock),
            price: Number(price),
            supplierId: supplierId
        });
        await StockMovement.create({
            productId: product._id.toString(),
            change: product.stock
        });
        res.json(product);
    } catch(err) {
        console.error(err);
        res.status(500).json({message : "Error adding product"});
    }
};

const deleteProduct = async (req,res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting product" });
    }
};

const updateProduct = async (req, res) => {
    try {    
        const id = req.params.id;
        const { name, category, stock, price, supplierId } = req.body;
        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Name required" });
        }
        if (!category || category.trim() === "") {
            return res.status(400).json({ message: "Category required" });
        }
        if (!Number.isFinite(Number(stock)) || Number(stock) < 0) {
            return res.status(400).json({ message: "Invalid stock" });
        }
        if (!Number.isFinite(Number(price)) || Number(price) < 0) {
            return res.status(400).json({ message: "Invalid price" });
        }
        if (!supplierId) {
            return res.status(400).json({ message: "Supplier required" });
        }
        const supplierExists = await Supplier.findById(supplierId);
        if (!supplierExists) {
            return res.status(400).json({ message: "Invalid supplier" });
        }
        const exists = await Product.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") }, _id: { $ne: id }});
        if (exists) {
            return res.status(400).json({ message: "Product already exists" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, 
            {
            name: name.trim(),
            category: category.trim(),
            stock: Number(stock),
            price: Number(price),
            supplierId: supplierId
            },
            { returnDocument: 'after' }
        );
        if(!updatedProduct) {
            return res.status(404).json({message: "Product not found"});
        }
        res.json(updatedProduct);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Error updating product" });
    }
};

const patchProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const oldProduct = await Product.findById(id);
        const { name, category, stock, price, supplierId } = req.body;
        const update = {};
        if (name !== undefined) {
            if (!name || name.trim() === "") {
                return res.status(400).json({ message: "Invalid name" });
            }
            const exists = await Product.findOne({name: { $regex: new RegExp(`^${name}$`, "i") },_id: { $ne: id }});
            if (exists) {
                return res.status(400).json({ message: "Product already exists" });
            }
            update.name = name.trim();
        }
        if (category !== undefined) {
            if (!category || category.trim() === "") {
                return res.status(400).json({ message: "Invalid category" });
            }
            update.category = category.trim();
        }
        let stockChange = 0;
        if (stock !== undefined) {
            if (!Number.isFinite(Number(stock)) || Number(stock) < 0) {
                return res.status(400).json({ message: "Invalid stock" });
            }
            stockChange = Number(stock) - oldProduct.stock;
            update.stock = Number(stock);
        }
            if (price !== undefined) {
            if (!Number.isFinite(Number(price)) || Number(price) < 0) {
                return res.status(400).json({ message: "Invalid price" });
            }
            update.price = Number(price);
        }
        if (supplierId !== undefined) {
            const supplierExists = await Supplier.findById(supplierId);
            if (!supplierExists) {
                return res.status(400).json({ message: "Invalid supplier" });
            }
            update.supplierId = supplierId;
        }
        const updated = await Product.findByIdAndUpdate(id,update,{ returnDocument: 'after' });
        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (stock !== undefined && stockChange !== 0) {
            await StockMovement.create({
                productId: id,
                change: stockChange
            });
        }  
        res.json(updated);
    } catch(err) {
        console.error(err);
    res.status(500).json({ message: "Error updating product" });
    }
};

module.exports = {getProducts, addProduct, deleteProduct, updateProduct, patchProduct};