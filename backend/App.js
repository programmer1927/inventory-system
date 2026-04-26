const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const exp = express();
exp.use(cors());
exp.use(express.json());
//MONGODB CONNECTION
mongoose.connect("mongodb://localhost:27017/inventory").then(() => console.log("MongoDB connected")).catch(err => console.log(err));
//SCHEMA
// Product
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  stock: Number,
  price: Number,
  supplierId: String
});
// Supplier
const supplierSchema = new mongoose.Schema({
  name: String
});
// MODELS
const Product = mongoose.model("Product", productSchema);
const Supplier = mongoose.model("Supplier", supplierSchema);
// //PRODUCTS
// let products = [];
// let id = 1;

//GET
exp.get('/products', async (req,res) => {
   try {
        const data = await Product.find();
        res.json(data);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
    }
});
// exp.get('/products/:id', (req,res) => {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) {
//         return res.status(400).json({ message: "Invalid ID" });
//     }
//     const product = products.find(product => product.id === id);
//     if(!product) {
//         return res.status(404).json({message: `Product with id: ${id} not found`});
//     }
//     res.json(product);
// });

//POST

exp.post('/products', async (req,res) => {
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
        res.json(product);
    } catch(err) {
        console.error(err);
        res.status(500).json({message : "Error adding product"});
    }
});

//DELETE
exp.delete('/products/:id', async (req,res) => {
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
});

// PUT
exp.put('/products/:id', async (req, res) => {
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
});
// PATCH
exp.patch('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
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
        if (stock !== undefined) {
            if (!Number.isFinite(Number(stock)) || Number(stock) < 0) {
                return res.status(400).json({ message: "Invalid stock" });
            }
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
        res.json(updated);
    } catch(err) {
        console.error(err);
    res.status(500).json({ message: "Error updating product" });
    }
});
// // SUPPLIERS
// let suppliers = [];
// let supplierId = 1;
// GET
exp.get("/suppliers", async (req, res) => {
    try {
        const data = await Supplier.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching suppliers" });
    }
});
// POST
exp.post("/suppliers", async (req, res) => {
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
});
// DELETE
exp.delete("/suppliers/:id", async (req, res) => {
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
});
// Port 5000
exp.listen(5000, () => {
    console.log("Server running on port 5000")
});